import express from "express";
import dotenv from "dotenv";
import  connectDB  from "./config/db.js";
import auth_router from "./route/auth_router.js";
import profile_router from "./route/profile_router.js"
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./utils/passport.js";   // <--- VERY IMPORTANT
import promotion_router from "./route/promotion_router.js"
import influencer_router from "./route/influencer_application.js";
import applications_router from "./route/applications_router.js"
//import influencer_routers from "./route/influencer_routes.js";
import notifications_router from "./route/notifications_router.js"
dotenv.config();
const app = express(); 
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000","https://spreadbfrontend.vercel.app" ], // frontend URL
    credentials: true,
  })
);
//  Required for Google OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/api/uploads", express.static("uploads"));
app.use("/api/auth", auth_router);
app.use("/api/profile",profile_router)
app.use("/api/promotion",promotion_router)
app.use("/api/campaigns",influencer_router)
app.use("/api/actions",applications_router)
app.use("/api/notifications",notifications_router)
//app.use("/api/influencer", influencer_routers);
app.use("/api/uploads/promotions", express.static("uploads/promotions"));
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
