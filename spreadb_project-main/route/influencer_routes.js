import express from "express";
import { protect, checkRole } from "../middleware/auth_middleware.js";
import {
  createOrUpdateInfluencerProfile,
  getInfluencerProfile,
  getPublicInfluencerProfile,
  applyForPromotion,
  withdrawApplication,
  topUpSticks,
  getStickBalance,
  getStickHistory,
  getApplications,
  getRecommendedPromotions
} from "../controller/influencer_controller.js";

const influencer_router = express.Router();

// Profile Routes
influencer_router.post(
  "/profile",
  protect,
  checkRole("Influencer"),
  createOrUpdateInfluencerProfile
);

influencer_router.get(
  "/profile",
  protect,
  checkRole("Influencer"),
  getInfluencerProfile
);

influencer_router.get(
  "/profile/public/:influencerId",
  getPublicInfluencerProfile
);

// Application Routes
influencer_router.post(
  "/apply",
  protect,
  checkRole("Influencer"),
  applyForPromotion
);

influencer_router.post(
  "/withdraw",
  protect,
  checkRole("Influencer"),
  withdrawApplication
);

influencer_router.get(
  "/applications",
  protect,
  checkRole("Influencer"),
  getApplications
);

// Sticks Management
influencer_router.post(
  "/sticks/topup",
  protect,
  checkRole("Influencer"),
  topUpSticks
);

influencer_router.get(
  "/sticks/balance",
  protect,
  checkRole("Influencer"),
  getStickBalance
);

influencer_router.get(
  "/sticks/history",
  protect,
  checkRole("Influencer"),
  getStickHistory
);

// Promotions
influencer_router.get(
  "/promotions/recommended",
  protect,
  checkRole("Influencer"),
  getRecommendedPromotions
);

export default influencer_router;
