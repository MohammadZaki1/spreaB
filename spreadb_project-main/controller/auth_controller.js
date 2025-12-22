import User from "../model/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";
import { otpEmailTemplate, forgotPasswordTemplate } from "../utils/emailTemplates.js";


const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || "secret123";
  return jwt.sign(
    {
      _id: user._id,        // controllers use req.user._id
      id: user._id,         // some code expects id
      email: user.email,    // useful to decode email without DB lookup
      role: user.role
    },
    secret,
    { expiresIn: "1h" }
  );
};


// ✅ Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Helper to hash OTP before saving
const hashOtp = async (otp) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(otp, salt);
};

// ✅ Signup with Hashed OTP
const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

   // Strong password validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const otp = generateOTP();
    const hashedOtp = await hashOtp(otp);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: hashedOtp,
      otpExpires,
    });
    await newUser.save();
      try {
      await sendEmail(email, "Verify Your Email - OTP", otpEmailTemplate(firstName, otp));
    } catch (emailError) {
      console.error(" Email sending failed:", emailError.message);
      return res.status(500).json({
        message:
          "Signup successful, but OTP email could not be sent. Please contact support.",
      });
    }
    return res.status(200).json({ message: "OTP sent to your email for verification." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Verify Hashed OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.otp) return res.status(400).json({ message: "No OTP found" });
    if (user.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid)
      return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user);
    //return res.json({ message: "Account verified successfully", token });
    return res.json({
  message: "Account verified successfully",
  token,
  userId: user._id,
  email: user.email,
  role: user.role
});

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔹 Generate new OTP
    const otp = generateOTP();
    const hashedOtp = await hashOtp(otp);

    user.otp = hashedOtp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
    await user.save();

    try {
      await sendEmail(
        email,
        "Your New OTP Code",
        otpEmailTemplate(user.firstName, otp)
      );
      console.log(`📧 Resent OTP email to ${email}`);
    } catch (emailError) {
      console.error(" Failed to resend OTP email:", emailError.message);
      return res.status(500).json({
        message: "Could not resend OTP. Please try again later.",
      });
    }

    return res.status(200).json({
      message: "A new OTP has been sent to your registered email.",
    });
  } catch (err) {
    console.error(" Resend OTP error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Login with Hashed OTP
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

  
      const otp = generateOTP();
      const hashedOtp = await hashOtp(otp);
      user.otp = hashedOtp;
      user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
      await user.save();
 try {
      await sendEmail(
        email,
        "Your Login OTP - Multi-Factor Authentication",
        otpEmailTemplate(user.firstName, otp)
      );
      console.log(`📧 OTP email sent to ${email}`);
    } catch (emailError) {
      console.error("❌ OTP email sending failed:", emailError.message);
      return res.status(500).json({
        message:
          "Login OTP could not be sent. Please contact support or try again.",
      });
    }

    return res.status(200).json({
      message: "OTP sent to your registered email. Please verify to continue.",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Forgot Password (unchanged)
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await sendEmail(email, "Password Reset Request", forgotPasswordTemplate(user.firstName, resetLink));

    return res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Reset Password (same)
const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;

  if (!token) return res.status(400).json({ message: "Token required" });
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  // Strong password validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
// ✅ Refresh Token
const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    const newToken = generateToken({ _id: decoded.id, role: decoded.role });
    return res.json({ message: "Token refreshed", token: newToken });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

//google oath
const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    const user = req.user;

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // Redirect to dashboard OR login
    return res.redirect(
      `${process.env.FRONTEND_URL}/login?token=${token}&role=${user.role}&email=${user.email}`
    );

  } catch (error) {
    console.error("Google OAuth Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};

export {
  userSignup,
  verifyOtp,
  userLogin,
  forgotPassword,
  resetPassword,
  refreshToken,
  resendOtp ,
  googleCallback
};





// import User from "../model/users.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// // ✅ Create JWT token
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET || "secret123",
//     { expiresIn: "1h" }
//   );
// };

// // ✅ Signup
// const userSignup = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password,confirmPassword, role } = req.body;

//     if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
//       return res.status(400).json({ message: "All fields are required." });
//     }
//     // Passwords must match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match." });
//     }
//     // Strong password validation
//     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     if (!strongPasswordRegex.test(password)) {
//       return res.status(400).json({
//         message:
//           "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
//       });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     // Create new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password,
//       role,
//     });
//     await newUser.save();

//     const token = generateToken(newUser);
//     return res.status(201).json({ message: "Signup successful", token, user: newUser });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Login
// const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid email or password" });

//     const token = generateToken(user);
//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };


// // ✅ Refresh Token
// const refreshToken = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(400).json({ message: "Token required" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
//     const newToken = generateToken({ _id: decoded.id, role: decoded.role });
//     return res.json({ message: "Token refreshed", token: newToken });
//   } catch (err) {
//     return res.status(400).json({ message: "Invalid or expired token" });
//   }
// };

// // ✅ Forgot Password
// const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const resetToken = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1h" }
//     );

//     // Simulate email sending
//     const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
//     console.log("Reset Link:", resetLink);

//     return res.json({ message: "Password reset link sent to email", resetLink });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Reset Password
// const resetPassword = async (req, res) => {
//   const { token } = req.query;
//   const { password, confirmPassword } = req.body;

//   if (!token) return res.status(400).json({ message: "Token is required" });
//   if (password !== confirmPassword)
//     return res.status(400).json({ message: "Passwords do not match" });

//   // Validate password strength
//   const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//   if (!strongPasswordRegex.test(password)) {
//     return res.status(400).json({
//       message:
//         "Password must be 8+ chars, with uppercase, lowercase, and number.",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
//     const user = await User.findOne({ _id: decoded.userId });
//     if (!user) return res.status(404).json({ message: "Invalid or expired token" });

//     user.password = password; // pre-save hook hashes automatically
//     await user.save();

//     return res.json({ message: "Password reset successful" });
//   } catch (err) {
//     return res.status(400).json({ message: "Invalid or expired token" });
//   }
// };

// export {
//   userSignup,
//   userLogin,
//   refreshToken,
//   forgotPassword,
//   resetPassword,
// };
