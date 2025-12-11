// ✅ OTP Email Template
export const otpEmailTemplate = (firstName, otp) => `
  <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px; border-radius:10px;">
    <h2>Hi ${firstName},</h2>
    <p>Thank you for using our service. Use the OTP below to verify your account or complete login:</p>
    <div style="background:#222; color:#fff; font-size:22px; letter-spacing:4px; text-align:center; padding:15px; border-radius:8px;">
      ${otp}
    </div>
    <p style="color:#888;">This OTP is valid for <strong>5 minutes</strong>.</p>
    <p>Do not share this code with anyone.</p>
    <p>Best regards,<br>Team Support</p>
  </div>
`;

// ✅ Forgot Password Email Template
export const forgotPasswordTemplate = (firstName, resetLink) => `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px; border-radius:10px;">
    <h2>Hi ${firstName},</h2>
    <p>We received a request to reset your password. Click the link below to reset it:</p>
    <a href="${resetLink}" style="background:#007bff; color:#fff; text-decoration:none; padding:10px 20px; border-radius:5px;">
      Reset Password
    </a>
    <p style="color:#888;">This link will expire in 1 hour.</p>
    <p>If you didn’t request this, you can ignore this email.</p>
  </div>
`;
