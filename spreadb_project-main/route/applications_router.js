import express from "express";
import { protect } from "../middleware/auth_middleware.js";
import { getAgreements, reviewApplication } from "../controller/applications_controller.js";
import { signAgreement } from "../controller/applications_controller.js";
import { getNotifications, markAsRead } from "../controller/notifications_controller.js";

const applications_router = express.Router();

// APPLICATION REVIEW (Brand Owner)
applications_router.patch("/review", protect, reviewApplication);//DONE
applications_router.get("/agreements", protect, getAgreements);
// AGREEMENT SIGNING (Influencer)
applications_router.patch("/agreement/sign", protect, signAgreement);

// NOTIFICATIONS
applications_router.get("/notifications", protect, getNotifications);
applications_router.patch("/notifications/mark-read/:id", protect, markAsRead);

export default applications_router;
