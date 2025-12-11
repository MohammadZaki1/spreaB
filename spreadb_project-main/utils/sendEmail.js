import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // Add attachments only if provided
    if (attachments.length > 0) {
      mailOptions.attachments = attachments;
    }

    // ❗ Use the mailOptions instead of creating a new object
    await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(" Email sending error:", error.message);
    throw new Error(error.message);
  }
};





// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, html,attachments = []) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//   const mailOptions = {
//       from: `"Your App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     };
//    // Add attachments if provided
//     if (attachments.length > 0) {
//       mailOptions.attachments = attachments;
//     }

//     await transporter.sendMail({
//       from: `"Your App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log(`✅ Email sent to ${to}`);
//   } catch (error) {
//     console.error(" Email sending error:", error.message);
//     throw new Error(err.message);
//   }
// };
