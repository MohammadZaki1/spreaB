import {Promotion,Application} from "../model/promotion_model.js";
import { InfluencerProfile, BrandOwnerProfile } from "../model/profile.js";
import { Notification } from "../model/notification_model.js";

export const applyForPromotion = async (req, res) => {
  try {
    const userId = req.user._id;
    const { campaignId } = req.body;

    const influencer = await InfluencerProfile.findOne({ userId });
    if (!influencer)
      return res.status(404).json({ message: "Influencer profile not found" });

    const campaign = await Promotion.findById(campaignId);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    // prevent duplicate
    const alreadyApplied = await Application.findOne({
      influencerId: userId,
      campaignId,
      status: { $ne: "withdrawn" },
    });

    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied" });

    // validate sticks
    if (influencer.reports.availableSticks < campaign.requiredSticks) {
      return res
        .status(400)
        .json({ message: "Not enough sticks to apply" });
    }

    // deduct sticks
    influencer.reports.availableSticks -= campaign.requiredSticks;

    influencer.reports.sticksHistory.push({
      action: "Spent on application",
      amount: campaign.requiredSticks,
      date: new Date(),
    });

    influencer.reports.promotionsApplied.push(campaignId);

    await influencer.save();

    // new application
    const application = await Application.create({
      campaignId,
      influencerId: userId,
      sticksSpent: campaign.requiredSticks,
    });
// 🔔 Notify brand owner about new application
await Notification.create({
  userId: campaign.brandOwnerId,
  title: "New Application",
  message: `An influencer applied to your promotion "${campaign.title}"`,
  type: "application",
  entityId: application._id,
  entityType: "Application",
});

    return res
      .status(201)
      .json({ message: "Application submitted", application });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const withdrawApplication = async (req, res) => {
  try {
    const userId = req.user._id;
    const { applicationId } = req.body;

    const application = await Application.findById(applicationId);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.influencerId.toString() !== userId.toString())
      return res.status(403).json({ message: "Unauthorized" });

    if (application.status !== "pending")
      return res.status(400).json({ message: "Cannot withdraw now" });

    const influencer = await InfluencerProfile.findOne({ userId });

    influencer.reports.availableSticks += application.sticksSpent;

    influencer.reports.sticksHistory.push({
      action: "Refund: Withdraw Application",
      amount: application.sticksSpent,
      date: new Date(),
    });

    application.status = "withdrawn";

    await influencer.save();
    await application.save();
await Notification.create({
  userId: application.campaignId.brandOwnerId,
  title: "Application Withdrawn",
  message: `An influencer withdrew their application`,
  type: "application",
  entityId: application._id,
  entityType: "Application",
});

    return res.status(200).json({ message: "Application withdrawn" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

 
//  Stick Top-up / Refill

 
export const topUpSticks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount } = req.body;
 
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
 
    const influencer = await InfluencerProfile.findOne({ userId });
    if (!influencer)
      return res.status(404).json({ message: "Influencer profile not found" });
 
    influencer.reports.availableSticks += amount;
 
    influencer.reports.sticksHistory.push({
      action: "Top-up",
      amount: amount,
      date: new Date(),
    });
 
    await influencer.save();
 
    return res.status(200).json({
      message: "Sticks added successfully",
      availableSticks: influencer.reports.availableSticks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
 

//  Stick Usage & History

 
export const getStickHistory = async (req, res) => {
  try {
    const userId = req.user._id;
 
    const influencer = await InfluencerProfile.findOne({ userId });
    if (!influencer)
      return res.status(404).json({ message: "Influencer profile not found" });
 
    return res.status(200).json({
      availableSticks: influencer.reports.availableSticks,
      history: influencer.reports.sticksHistory.reverse(), // newest first
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
 

// Stick Balance Only

 
export const getStickBalance = async (req, res) => {
  try {
    const userId = req.user._id;
 
    const influencer = await InfluencerProfile.findOne({ userId });
    if (!influencer)
      return res.status(404).json({ message: "Influencer profile not found" });
 
    return res.status(200).json({
      availableSticks: influencer.reports.availableSticks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};