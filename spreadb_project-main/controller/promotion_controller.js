import {Promotion} from "../model/promotion_model.js";
import { InfluencerProfile, BrandOwnerProfile } from "../model/profile.js";
import { Notification } from "../model/notification_model.js";
import User from "../model/users.js";
export const createPromotion = async (req, res) => {
  try {
    const userId = req.user._id; // from token

    // Ensure Brand Owner profile exists
    const brandOwner = await BrandOwnerProfile.findOne({ userId });
    if (!brandOwner) {
      return res.status(404).json({ message: "Brand Owner profile not found" });
    }

    const {
      title,
      description,
      categories,
      locations,
      budget,
      duration,
      requiredSticks,
       openings,
    } = req.body;

     if (!openings || openings <= 0) {
      return res.status(400).json({
        message: "Openings must be greater than 0",
      });
    }

    const promotion = await Promotion.create({
      brandOwnerId: userId,
      title,
      description,
      categories,
      locations,
      budget,
      duration,
      requiredSticks,
      openings,           
      filledPositions: 0, 
    });

    // increase brand owner promotion count
    brandOwner.promotionsPosted += 1;
    await brandOwner.save();
const influencers = await InfluencerProfile.find({
  locations: { $in: locations },
}).select("userId");

if (influencers.length > 0) {
  const notifications = influencers.map((inf) => ({
    userId: inf.userId,
    title: "New Promotion",
    message: `New promotion "${title}" available in your location`,
    type: "promotion",
    entityId: promotion._id,
    entityType: "Promotion",
  }));

  await Notification.insertMany(notifications);
}

    return res.status(201).json({
      message: "Promotion created successfully",
      promotion,
      
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMyPromotions = async (req, res) => {
  try {
    const userId = req.user._id;

    const promotions = await Promotion.find({ brandOwnerId: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Promotions fetched successfully",
      promotions,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const browsePromotions = async (req, res) => {
  try {
    const userId = req.user._id;

    const profile = await InfluencerProfile.findOne({ userId });
    if (!profile)
      return res.status(404).json({ message: "Influencer profile not found" });

    const categories = profile.category || [];
    const locations = profile.locations || [];

    let query = {
      status: "active",
      applicationStatus: "open",
    };

    // 🎯 Location is mandatory
    if (locations.length > 0) {
      query.locations = { $in: locations };
    }

    // 🎯 Category is optional
    if (categories.length > 0) {
      query.categories = { $in: categories };
    }

    const promotions = await Promotion.find(query)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Promotions fetched successfully",
      promotions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


// export const browsePromotions = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const profile = await InfluencerProfile.findOne({ userId });
//     if (!profile)
//       return res.status(404).json({ message: "Influencer profile not found" });

//     const interests = profile.category || [];
//     const locations = profile.locations || [];

//     // Base query
//     let query = {
//       applicationStatus: "open",
//       status: "active",
//     };

//     // Build dynamic OR conditions only if influencer has categories/locations
//     const orConditions = [];

//     if (interests.length > 0) {
//       orConditions.push({ categories: { $in: interests } });
//     }

//     if (locations.length > 0) {
//       orConditions.push({ locations: { $in: locations } });
//     }

//     // If influencer has any matching fields → add $or
//     if (orConditions.length > 0) {
//       query.$or = orConditions;
//     }

//     const promotions = await Promotion.find(query).sort({ createdAt: -1 });

//     return res.status(200).json({
//       message: "Promotions fetched successfully",
//       promotions,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// Get all promotions (public route)
export const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find({ 
      status: "active", 
      applicationStatus: "open" 
    })
    .sort({ createdAt: -1 })
    .select('-brandOwnerId');

    return res.status(200).json({
      message: "Promotions fetched successfully",
      promotions,
    });
  } catch (err) {
    console.error("Error fetching promotions:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get promotion by ID (public route)
export const getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const promotion = await Promotion.findById(id)
      .select('-brandOwnerId');

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Increment views
    promotion.views += 1;
    await promotion.save();

    return res.status(200).json({
      message: "Promotion fetched successfully",
      promotion,
    });
  } catch (err) {
    console.error("Error fetching promotion:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get similar promotions (by categories)
export const getSimilarPromotions = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get the current promotion to find similar ones
    const currentPromotion = await Promotion.findById(id);
    if (!currentPromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Find promotions with similar categories, excluding the current one
    const similarPromotions = await Promotion.find({
      _id: { $ne: id },
      categories: { $in: currentPromotion.categories },
      status: "active",
      applicationStatus: "open"
    })
    .limit(4)
    .select('-brandOwnerId -description -about -skills -otherLinks')
    .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Similar promotions fetched successfully",
      promotions: similarPromotions,
    });
  } catch (err) {
    console.error("Error fetching similar promotions:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get promotion by public ID (for URLs)
export const getPromotionByPublicId = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    const promotion = await Promotion.findOne({ publicId })
      .select('-brandOwnerId');

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Increment views
    promotion.views += 1;
    await promotion.save();

    return res.status(200).json({
      message: "Promotion fetched successfully",
      promotion,
    });
  } catch (err) {
    console.error("Error fetching promotion:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update promotion
export const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Handle image uploads for updates
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `/api/uploads/promotions/${file.filename}`,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      }));
      
      // Add new images to existing ones
      updateData.images = [...(promotion.images || []), ...newImages];
    }

    // Update only allowed fields
    const allowedUpdates = [
      'title', 'description', 'about', 'website', 'instagram', 'facebook', 'otherLinks',
      'categories', 'locations', 'skills', 'budget', 'budgetType', 'duration', 
      'requiredSticks', 'images', 'status', 'applicationStatus'
    ];
    
    allowedUpdates.forEach(field => {
      if (updateData[field] !== undefined) {
        promotion[field] = updateData[field];
      }
    });

    await promotion.save();

    return res.status(200).json({
      message: "Promotion updated successfully",
      promotion,
    });
  } catch (err) {
    console.error("Error updating promotion:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete promotion image
export const deletePromotionImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;

    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Find the image to remove
    const imageIndex = promotion.images.findIndex(img => 
      img._id.toString() === imageId || img.filename === imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imageToRemove = promotion.images[imageIndex];
    
    // Remove image from array
    promotion.images.splice(imageIndex, 1);
    await promotion.save();

    // Delete physical file
    try {
      const filePath = `uploads/promotions/${imageToRemove.filename}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fileError) {
      console.error('Error deleting image file:', fileError);
    }

    return res.status(200).json({
      message: "Image deleted successfully",
      promotion,
    });
  } catch (err) {
    console.error("Error deleting promotion image:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete promotion
export const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Delete associated image files
    if (promotion.images && promotion.images.length > 0) {
      promotion.images.forEach(image => {
        try {
          const filePath = `uploads/promotions/${image.filename}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileError) {
          console.error('Error deleting image file:', fileError);
        }
      });
    }

    await Promotion.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Promotion deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting promotion:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
// export const getMyPromotions = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const promotions = await Promotion.find({ brandOwnerId: userId })
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       message: "Promotions fetched successfully",
//       promotions,
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const browsePromotions = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const profile = await InfluencerProfile.findOne({ userId });
//     if (!profile)
//       return res.status(404).json({ message: "Influencer profile not found" });

//     const interests = profile.category || [];
//     const locations = profile.locations || [];

//     // Base query
//     let query = {
//       applicationStatus: "open",
//       status: "active",
//     };

//     // Build dynamic OR conditions only if influencer has categories/locations
//     const orConditions = [];

//     if (interests.length > 0) {
//       orConditions.push({ categories: { $in: interests } });
//     }

//     if (locations.length > 0) {
//       orConditions.push({ locations: { $in: locations } });
//     }

//     // If influencer has any matching fields → add $or
//     if (orConditions.length > 0) {
//       query.$or = orConditions;
//     }

//     const promotions = await Promotion.find(query).sort({ createdAt: -1 });

//     return res.status(200).json({
//       message: "Promotions fetched successfully",
//       promotions,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


export const getApplicantsForCampaign = async (req, res) => {
  try {
    const userId = req.user._id;
    const { campaignId } = req.params;

    // Validate campaign exists and belongs to brand owner
    const campaign = await Promotion.findOne({
      _id: campaignId,
      brandOwnerId: userId,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found or unauthorized access",
      });
    }

    // Fetch applications + influencer data
    const applicants = await Application.find({ campaignId })
      .populate("influencerId", "name email role") // basic data from user model
      .sort({ createdAt: -1 });

    if (applicants.length === 0) {
      return res.status(200).json({
        message: "No applicants yet",
        applicants: [],
      });
    }

    // Fetch Influencer profile (experience, reach, category)
    const response = [];

    for (const app of applicants) {
      const profile = await InfluencerProfile.findOne({
        userId: app.influencerId._id,
      });

      response.push({
        applicationId: app._id,
        status: app.status,
        appliedOn: app.createdAt,
        notes: app.notes || null,

        influencer: {
          id: app.influencerId._id,
          name: app.influencerId.name,
          email: app.influencerId.email,
          experience: profile?.experience || "Not Provided",
          reach: profile?.followers || "Not Provided",
          category: profile?.category || [],
          location: profile?.location || [],
        },
      });
    }

    return res.status(200).json({
      message: "Applicants fetched successfully",
      applicants: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

