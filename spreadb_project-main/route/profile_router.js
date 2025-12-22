import express from "express";
import {
  createInfluencer,
  createBrandOwner,
 getInfluencerProfile,
  getBrandOwnerProfile,
  updateInfluencerProfile,
  updateBrandOwnerProfile,
  getInfluencersForBrandOwner
} from "../controller/profiles_controller.js";
import { protect,checkRole } from "../middleware/auth_middleware.js";
import upload from "../middleware/upload.js";

const profile_router = express.Router();



profile_router.post("/add_influencer", protect,checkRole("Influencer"), upload.single("profilePhoto"), createInfluencer);
profile_router.post("/add_brand-owner", protect,checkRole("Brand Owner"), upload.single("brandLogo"), createBrandOwner);

profile_router.get("/get_influencer", protect,checkRole("Influencer"), getInfluencerProfile);
profile_router.get("/brand-owner", protect,checkRole("Brand Owner"), getBrandOwnerProfile);

profile_router.patch("/influencer", protect, checkRole("Influencer"),upload.single("profilePhoto"), updateInfluencerProfile);
profile_router.patch("/brand-owner", protect,checkRole("Brand Owner"), upload.single("brandLogo"), updateBrandOwnerProfile);
profile_router.get(
  "/brand/influencers",
  protect,checkRole("Brand Owner"),
  getInfluencersForBrandOwner
);

export default profile_router;