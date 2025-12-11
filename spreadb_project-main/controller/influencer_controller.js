import Influencer from "../model/influencer_model.js";
import { Promotion, Application } from "../model/promotion_model.js";
import User from "../model/users.js";

// Create or Update Influencer Profile
export const createOrUpdateInfluencerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;

    // Find existing profile or create new one
    let influencer = await Influencer.findOne({ userId });

    if (influencer) {
      // Update existing profile
      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          // Handle nested objects
          if (key === 'socialLinks' && typeof updateData[key] === 'object') {
            influencer.socialLinks = { ...influencer.socialLinks, ...updateData[key] };
          } else if (key === 'location' && typeof updateData[key] === 'object') {
            influencer.location = { ...influencer.location, ...updateData[key] };
          } else if (key === 'preferences' && typeof updateData[key] === 'object') {
            influencer.preferences = { ...influencer.preferences, ...updateData[key] };
          } else {
            influencer[key] = updateData[key];
          }
        }
      });

      // Calculate profile completion percentage
      influencer.profileCompletion = calculateProfileCompletion(influencer);
    } else {
      // Create new profile
      influencer = new Influencer({
        userId,
        displayName: req.user.name || req.user.email.split('@')[0],
        email: req.user.email,
        ...updateData
      });
      
      // Add welcome sticks bonus
      await influencer.addSticks(50, "Welcome bonus sticks", "bonus");
    }

    await influencer.save();

    return res.status(200).json({
      message: "Influencer profile updated successfully",
      influencer: await formatInfluencerResponse(influencer)
    });
  } catch (error) {
    console.error("Error updating influencer profile:", error);
    return res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Influencer Profile
export const getInfluencerProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const influencer = await Influencer.findOne({ userId })
      .populate('applications.promotionId', 'title budget duration')
      .populate('applications.applicationId', 'status createdAt');

    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    return res.status(200).json({
      message: "Influencer profile fetched successfully",
      influencer: await formatInfluencerResponse(influencer)
    });
  } catch (error) {
    console.error("Error fetching influencer profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Public Influencer Profile
export const getPublicInfluencerProfile = async (req, res) => {
  try {
    const { influencerId } = req.params;

    const influencer = await Influencer.findById(influencerId)
      .select('-stickTransactions -email -phone -preferences.notificationSettings')
      .populate('applications.promotionId', 'title categories')
      .populate('applications.applicationId', 'status');

    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    return res.status(200).json({
      message: "Public influencer profile fetched successfully",
      influencer: await formatPublicInfluencerResponse(influencer)
    });
  } catch (error) {
    console.error("Error fetching public influencer profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Apply for Promotion
export const applyForPromotion = async (req, res) => {
  try {
    const userId = req.user._id;
    const { promotionId, proposal, estimatedDelivery, bidAmount } = req.body;

    // Find influencer
    const influencer = await Influencer.findOne({ userId });
    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    // Find promotion
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    // Check if promotion is active
    if (promotion.status !== 'active' || promotion.applicationStatus !== 'open') {
      return res.status(400).json({ message: "This promotion is not currently accepting applications" });
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({
      influencerId: userId,
      campaignId: promotionId,
      status: { $in: ["pending", "accepted", "under_review"] }
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied to this promotion" });
    }

    // Check if influencer has enough sticks
    if (influencer.sticks.available < promotion.requiredSticks) {
      return res.status(400).json({ 
        message: "Insufficient sticks to apply for this promotion",
        required: promotion.requiredSticks,
        available: influencer.sticks.available
      });
    }

    // Spend sticks for application
    await influencer.spendSticks(
      promotion.requiredSticks,
      `Applied for promotion: ${promotion.title}`,
      promotionId
    );

    // Create application
    const application = await Application.create({
      campaignId: promotionId,
      influencerId: userId,
      proposal: proposal || "",
      estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : undefined,
      bidAmount: bidAmount || null,
      sticksSpent: promotion.requiredSticks,
      status: "pending"
    });

    // Add to influencer's applications
    influencer.applications.push({
      promotionId: promotionId,
      applicationId: application._id,
      appliedAt: new Date(),
      status: "pending"
    });

    // Update stats
    influencer.stats.totalApplications += 1;
    await influencer.save();

    // Update promotion applications count
    promotion.applicationsCount += 1;
    await promotion.save();

    return res.status(201).json({
      message: "Application submitted successfully",
      application: {
        _id: application._id,
        status: application.status,
        appliedAt: application.createdAt,
        sticksSpent: application.sticksSpent,
        proposal: application.proposal
      },
      remainingSticks: influencer.sticks.available
    });
  } catch (error) {
    console.error("Error applying for promotion:", error);
    return res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Withdraw Application
export const withdrawApplication = async (req, res) => {
  try {
    const userId = req.user._id;
    const { applicationId } = req.body;

    // Find application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check ownership
    if (application.influencerId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to withdraw this application" });
    }

    // Check if application can be withdrawn
    if (!["pending", "under_review"].includes(application.status)) {
      return res.status(400).json({ 
        message: "Cannot withdraw application in current status",
        currentStatus: application.status
      });
    }

    // Find influencer
    const influencer = await Influencer.findOne({ userId });
    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    // Refund sticks
    await influencer.refundSticks(
      application.sticksSpent,
      `Withdrawn application for promotion`,
      application.campaignId,
      applicationId
    );

    // Update application status
    application.status = "withdrawn";
    application.withdrawnAt = new Date();
    await application.save();

    // Update influencer's application status
    const appIndex = influencer.applications.findIndex(
      app => app.applicationId.toString() === applicationId
    );
    if (appIndex !== -1) {
      influencer.applications[appIndex].status = "withdrawn";
      await influencer.save();
    }

    return res.status(200).json({
      message: "Application withdrawn successfully",
      refundedSticks: application.sticksSpent,
      remainingSticks: influencer.sticks.available
    });
  } catch (error) {
    console.error("Error withdrawing application:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Top Up Sticks
export const topUpSticks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount, paymentMethod = "manual" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const influencer = await Influencer.findOne({ userId });
    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    // Add sticks
    await influencer.addSticks(amount, `Top-up via ${paymentMethod}`);

    return res.status(200).json({
      message: "Sticks added successfully",
      sticks: {
        added: amount,
        available: influencer.sticks.available,
        totalEarned: influencer.sticks.totalEarned
      }
    });
  } catch (error) {
    console.error("Error topping up sticks:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Stick Balance and History
export const getStickBalance = async (req, res) => {
  try {
    const userId = req.user._id;

    const influencer = await Influencer.findOne({ userId });
    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    return res.status(200).json({
      sticks: {
        available: influencer.sticks.available,
        totalEarned: influencer.sticks.totalEarned,
        totalSpent: influencer.sticks.totalSpent
      }
    });
  } catch (error) {
    console.error("Error fetching stick balance:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Stick History
export const getStickHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 20 } = req.query;

    const influencer = await Influencer.findOne({ userId });
    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    // Paginate transactions
    const transactions = influencer.stickTransactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice((page - 1) * limit, page * limit);

    return res.status(200).json({
      sticks: {
        available: influencer.sticks.available,
        totalEarned: influencer.sticks.totalEarned,
        totalSpent: influencer.sticks.totalSpent
      },
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: influencer.stickTransactions.length,
        pages: Math.ceil(influencer.stickTransactions.length / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching stick history:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Applications
export const getApplications = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const influencer = await Influencer.findOne({ userId })
      .populate('applications.promotionId')
      .populate('applications.applicationId');

    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    let applications = influencer.applications;

    // Filter by status if provided
    if (status && status !== 'all') {
      applications = applications.filter(app => app.status === status);
    }

    // Sort by applied date (newest first)
    applications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

    // Paginate
    const paginatedApplications = applications.slice((page - 1) * limit, page * limit);

    return res.status(200).json({
      applications: paginatedApplications,
      stats: {
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        accepted: applications.filter(app => app.status === 'accepted').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
        completed: applications.filter(app => app.status === 'completed').length
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: applications.length,
        pages: Math.ceil(applications.length / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Recommended Promotions
export const getRecommendedPromotions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const influencer = await Influencer.findOne({ userId });
    if (!influencer) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    // Build query based on influencer preferences and skills
    let query = {
      status: "active",
      applicationStatus: "open"
    };

    // Add category filter if influencer has preferred categories
    if (influencer.preferences.preferredCategories?.length > 0) {
      query.categories = { $in: influencer.preferences.preferredCategories };
    }

    // Add location filter
    if (influencer.location && !influencer.location.isRemote) {
      query.locations = { 
        $in: [
          influencer.location.city,
          influencer.location.state,
          influencer.location.country,
          "Remote"
        ]
      };
    }

    // Add budget filter
    if (influencer.preferences.minBudget > 0) {
      query.budget = { $gte: influencer.preferences.minBudget };
    }

    // Get promotions
    const promotions = await Promotion.find(query)
      .select('-brandOwnerId -description -about -otherLinks')
      .sort({ createdAt: -1 })
      .limit(limit * page);

    // Filter out already applied promotions
    const appliedPromotionIds = influencer.applications.map(app => app.promotionId.toString());
    const filteredPromotions = promotions.filter(promo => 
      !appliedPromotionIds.includes(promo._id.toString())
    );

    // Score promotions based on relevance
    const scoredPromotions = filteredPromotions.map(promo => {
      let score = 0;

      // Score based on skills match
      if (influencer.skills && promo.skills) {
        const matchingSkills = influencer.skills.filter(skill => 
          promo.skills.includes(skill)
        );
        score += matchingSkills.length * 10;
      }

      // Score based on category match
      if (influencer.categories && promo.categories) {
        const matchingCategories = influencer.categories.filter(cat => 
          promo.categories.includes(cat)
        );
        score += matchingCategories.length * 5;
      }

      // Bonus for higher budget
      score += Math.log10(promo.budget || 1);

      return { ...promo.toObject(), relevanceScore: score };
    });

    // Sort by relevance score
    scoredPromotions.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Paginate results
    const paginatedPromotions = scoredPromotions.slice(0, limit);

    return res.status(200).json({
      promotions: paginatedPromotions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: scoredPromotions.length,
        pages: Math.ceil(scoredPromotions.length / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching recommended promotions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Helper Functions
const calculateProfileCompletion = (influencer) => {
  let completion = 0;
  const fields = [
    'displayName', 'bio', 'profilePicture', 'skills', 'categories',
    'location.city', 'socialLinks.instagram'
  ];

  fields.forEach(field => {
    const value = getNestedValue(influencer, field);
    if (value && (typeof value !== 'object' || Object.keys(value).length > 0)) {
      completion += 100 / fields.length;
    }
  });

  return Math.round(completion);
};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const formatInfluencerResponse = async (influencer) => {
  const influencerObj = influencer.toObject();
  
  // Remove sensitive information
  delete influencerObj.userId;
  delete influencerObj.__v;
  
  return influencerObj;
};

const formatPublicInfluencerResponse = async (influencer) => {
  const influencerObj = influencer.toObject();
  
  // Remove sensitive information for public view
  delete influencerObj.userId;
  delete influencerObj.email;
  delete influencerObj.phone;
  delete influencerObj.stickTransactions;
  delete influencerObj.preferences;
  delete influencerObj.__v;
  
  return influencerObj;
};
