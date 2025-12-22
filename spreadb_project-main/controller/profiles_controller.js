import { InfluencerProfile, BrandOwnerProfile } from "../model/profile.js";
import { Notification } from "../model/notification_model.js";
import User from "../model/users.js";
// =========================================
// Create Influencer Profile
// =========================================

const createInfluencer = async (req, res) => {
  try {
    const userId = req.user._id;
    const email = req.user.email;

    //  VERY IMPORTANT: Convert JSON strings → arrays/objects
    if (req.body.category) req.body.category = JSON.parse(req.body.category);
    if (req.body.locations) req.body.locations = JSON.parse(req.body.locations);
    if (req.body.portfolioLinks) req.body.portfolioLinks = JSON.parse(req.body.portfolioLinks);
    if (req.body.socialMedia) req.body.socialMedia = JSON.parse(req.body.socialMedia);


    //const profilePhoto = req.file ? req.file.path : null;

    let  profilePhoto = "";
    if (req.file) {
       profilePhoto = `uploads/profilePhoto/${req.file.filename}`;
    }
    const socialMediaData = {
      instagram: {
        link: req.body?.socialMedia?.instagram?.link || "",
        followers: req.body?.socialMedia?.instagram?.followers || 0,
        views: req.body?.socialMedia?.instagram?.views || 0,
      },
      youtube: {
        link: req.body?.socialMedia?.youtube?.link || "",
        followers: req.body?.socialMedia?.youtube?.followers || 0,
        views: req.body?.socialMedia?.youtube?.views || 0,
      },
      twitter: {
        link: req.body?.socialMedia?.twitter?.link || "",
        followers: req.body?.socialMedia?.twitter?.followers || 0,
        views: req.body?.socialMedia?.twitter?.views || 0,
      },
    };
    const profile = await InfluencerProfile.create({
      userId,
      email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      about: req.body.about,
      category: req.body.category,
      locations: req.body.locations,
      portfolioLinks: req.body.portfolioLinks,
      socialMedia:socialMediaData,
      profilePhoto,
    });
await Notification.create({
  userId,
  message: "🎉 Your influencer profile is live! Start applying to promotions.",
  type: "system",
});

    res.status(201).json({ message: "Influencer profile created", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create Brand Owner Profile
// Create Brand Owner Profile
const createBrandOwner = async (req, res) => {
  try {
    const userId = req.user._id;
    const email = req.user.email;

    // Convert JSON strings → actual objects/arrays (very important)
    if (req.body.locations) req.body.locations = JSON.parse(req.body.locations);
    if (req.body.socialMedia) req.body.socialMedia = JSON.parse(req.body.socialMedia);
     if (req.body.verificationStatus) req.body.verificationStatus = JSON.parse(req.body.verificationStatus);
    // Handle brand Logo upload (same logic as influencer image)
    let brandLogo = "";
    if (req.file) {
      brandLogo = `uploads/profilePhoto/${req.file.filename}`;
    }

    const profile = await BrandOwnerProfile.create({
      userId,
      email,
      brandName: req.body.brandName,
      industry: req.body.industry,
      description: req.body.description,
      website: req.body.website,
      locations: req.body.locations,
      socialMedia: req.body.socialMedia,
      brandLogo,
       promotionsPosted: req.body.promotionsPosted || 0,
      rating: req.body.rating || 0,
      verificationStatus: req.body.verificationStatus || {
        email: false,
        phone: false,
        ownerName: false,
      },
      wallet: req.body.wallet || 0,
    });
await Notification.create({
  userId,
  message: "🏢 Your brand profile is created. Start posting promotions.",
  type: "system",
});

    res.status(201).json({ message: "Brand Owner profile created", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getInfluencerProfile = async (req, res) => {
  try {
    const profile = await InfluencerProfile.findOne({ userId: req.user.id });

    if (!profile)
      return res.status(404).json({ message: "Influencer profile not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBrandOwnerProfile = async (req, res) => {
  try {
    const profile = await BrandOwnerProfile.findOne({ userId: req.user.id });

    if (!profile)
      return res.status(404).json({ message: "Brand Owner profile not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const  updateInfluencerProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const existingProfile = await InfluencerProfile.findOne({ userId });
    if (!existingProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Convert JSON strings → actual arrays/objects (same as create API)
    if (req.body.category) req.body.category = JSON.parse(req.body.category);
    if (req.body.locations) req.body.locations = JSON.parse(req.body.locations);
    if (req.body.portfolioLinks) req.body.portfolioLinks = JSON.parse(req.body.portfolioLinks);
    if (req.body.socialMedia) req.body.socialMedia = JSON.parse(req.body.socialMedia);
   
    // Profile photo update logic
    let profilePhoto = existingProfile.profilePhoto; // keep old photo if no new one

    if (req.file) {
      profilePhoto = `uploads/profilePhoto/${req.file.filename}`;
    }

    // Update fields
    existingProfile.fullName = req.body.fullName ?? existingProfile.fullName;
    existingProfile.lastName = req.body.lastName ?? existingProfile.lastName;
    existingProfile.userName = req.body.userName ?? existingProfile.userName;
    existingProfile.phoneNumber = req.body.phoneNumber ?? existingProfile.phoneNumber;
    existingProfile.about = req.body.about ?? existingProfile.about;
    existingProfile.category = req.body.category ?? existingProfile.category;
    existingProfile.locations = req.body.locations ?? existingProfile.locations;
    existingProfile.portfolioLinks = req.body.portfolioLinks ?? existingProfile.portfolioLinks;
    existingProfile.profilePhoto = profilePhoto;

     if (req.body.socialMedia) {
      existingProfile.socialMedia.instagram = {
        ...existingProfile.socialMedia.instagram,
        ...req.body.socialMedia.instagram
      };

      existingProfile.socialMedia.youtube = {
        ...existingProfile.socialMedia.youtube,
        ...req.body.socialMedia.youtube
      };

      existingProfile.socialMedia.twitter = {
        ...existingProfile.socialMedia.twitter,
        ...req.body.socialMedia.twitter
      };
    }

    await existingProfile.save();

    res.status(200).json({
      message: "Influencer profile updated successfully",
      profile: existingProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateBrandOwnerProfile = async (req, res) => {
  try {
    let data = req.body;

    // Convert JSON strings → objects/arrays
    if (data.locations) data.locations = JSON.parse(data.locations);
    if (data.socialMedia) data.socialMedia = JSON.parse(data.socialMedia);

    // Handle brand logo update (same logic as POST)
    if (req.file) {
      data.brandLogo = `uploads/profilePhoto/${req.file.filename}`;
    }

    // Update profile
    const updated = await BrandOwnerProfile.findOneAndUpdate(
      { userId: req.user._id },
      data,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Brand Owner profile not found" });
    }

    res.json({ message: "Brand Owner updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInfluencersForBrandOwner = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Get brand owner profile
    const brandOwner = await BrandOwnerProfile.findOne({ userId });

    if (!brandOwner) {
      return res.status(404).json({ message: "Brand owner profile not found" });
    }

    if (!brandOwner.locations || brandOwner.locations.length === 0) {
      return res.status(200).json({ influencers: [] });
    }

    // 2️⃣ Find influencers matching brand owner locations
    const influencers = await InfluencerProfile.find({
      locations: { $in: brandOwner.locations },
    }).select(
      "firstName lastName userName profilePhoto category locations socialMedia rating verified"
    );

    res.status(200).json({
      count: influencers.length,
      influencers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export{
   createInfluencer,
  createBrandOwner,
 getInfluencerProfile,
  getBrandOwnerProfile,
  updateInfluencerProfile,
  updateBrandOwnerProfile,
  getInfluencersForBrandOwner
}