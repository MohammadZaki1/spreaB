import express from "express";
import { protect,checkRole } from "../middleware/auth_middleware.js";

import {
    browsePromotions,
  
  getApplicantsForCampaign,
  getMyPromotions,
    createPromotion,
  getAllPromotions,
  getPromotionById,
  getPromotionByPublicId,
  updatePromotion,
  deletePromotion,
  deletePromotionImage,
  getSimilarPromotions
} from "../controller/promotion_controller.js";

const promotion_router = express.Router();

promotion_router.get(
  "/my-promotions",
  protect,
  checkRole("Brand Owner"),
  getMyPromotions
);
promotion_router.get(
  "/browse",
  protect,
  checkRole("Influencer"),
  browsePromotions
);
// Public routes (no authentication required)
//promotion_router.post("/create", createPromotion, createPromotion);
promotion_router.get("/all", getAllPromotions);
promotion_router.get("/:id", getPromotionById);
promotion_router.get("/public/:publicId", getPromotionByPublicId);
promotion_router.get("/:id/similar", getSimilarPromotions); // New route for similar promotions
promotion_router.post(
  "/create",
  protect,
  checkRole("Brand Owner"),
  createPromotion
);



// Update and delete routes
promotion_router.put("/:id", createPromotion, updatePromotion);
promotion_router.delete("/:id/image/:imageId", deletePromotionImage);
promotion_router.delete("/:id", deletePromotion);


// promotion_router.get(
//   "/browse",
//   protect,
//   checkRole("Influencer"),
//   browsePromotions
// );

promotion_router.get("/campaign/:campaignId/applicants", protect,getApplicantsForCampaign);


export default promotion_router;


// import express from "express";
// import { protect,checkRole } from "../middleware/auth_middleware.js";

// import {
//     browsePromotions,
//   createPromotion,
//   getApplicantsForCampaign,
//   getMyPromotions,
// } from "../controller/promotion_controller.js";

// const promotion_router = express.Router();

// promotion_router.post(
//   "/create",
//   protect,
//   checkRole("Brand Owner"),
//   createPromotion
// );

// promotion_router.get(
//   "/my-promotions",
//   protect,
//   checkRole("Brand Owner"),
//   getMyPromotions
// );

// promotion_router.get(
//   "/browse",
//   protect,
//   checkRole("Influencer"),
//   browsePromotions
// );

// promotion_router.get("/campaign/:campaignId/applicants", protect,getApplicantsForCampaign);


// export default promotion_router;