const nodemailer = require("nodemailer");
const { responseHandler, emailTemplates, FindDuplicatewithoutUser } = require("../utils");
const bcrypt = require("bcryptjs");

// Configure transporter once and reuse it
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  requireTLS: process.env.EMAIL_REQUIRE_TLS === "true",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: process.env.EMAIL_REJECT_UNAUTHORIZED === "true",
  },
  pool: process.env.EMAIL_POOL === "true",
  maxConnections: Number(process.env.EMAIL_MAX_CONNECTIONS) || 5,
  maxMessages: Number(process.env.EMAIL_MAX_MESSAGES) || 10,
  connectionTimeout: Number(process.env.EMAIL_CONNECTION_TIMEOUT) || 60000,
});
 
// Generic email sending function
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!to || !subject || (!text && !html)) {
      throw new Error("Missing required fields");
    }
 
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text: text || "",
      html: html || "",
    };
 
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};
 
// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  console.log(`Sending OTP email to ${email} with code: ${otp}`);
  return sendEmail({
    to: email,
    subject: "Your OTP Verification Code",
    html: emailTemplates.otpTemplate(otp),
  });
};
 
// Generic function to handle OTP record creation
const createOTPRecord = (Model, field) => async (req, res) => {
  try {
    const { ...Data } = req.body;
 
    // Check for duplicates and delete previous records
    if (field) {
      const count = await FindDuplicatewithoutUser(Model, field, req.body);
      if (count > 0) {
        await Model.destroy({ where: { [field]: req.body[field] } });
      }
    }
 
    // Create new OTP record
    const record = await Model.create({ ...Data });
    console.log(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
 
    // Send OTP email
    await sendOtpEmail(record.email, record.otp);
 
    return responseHandler(res, {
      data: null,
      status: "success",
      message: "OTP sent successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error(`Error creating record in ${Model.name}: ${error.message}`);
    return responseHandler(res, {
      data: null,
      status: "error",
      message: "Internal server error",
      statusCode: 500,
      error: error.message,
    });
  }
};
 
// Generic function to handle OTP verification
const verifyOTP = (Model, field) => async (req, res) => {
  try {
    const { email, otp } = req.body;
 
    if (!email || !otp) {
      return responseHandler(res, {
        data: null,
        status: "error",
        message: "Missing required fields: email or otp",
        statusCode: 400,
      });
    }
 
    const record = await Model.findOne({ where: { email, otp } });
 
    if (!record) {
      return responseHandler(res, {
        data: null,
        status: "error",
        message: "Invalid or expired OTP",
        statusCode: 400,
      });
    }
 
    // Optional: Perform logic on successful OTP verification
    console.log(`OTP verified successfully for ${email}: ${otp}`);
 
    // Delete the OTP record after successful verification
    await Model.destroy({ where: { email, otp } });
 
    return responseHandler(res, {
      data: null,
      status: "success",
      message: "OTP verified successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error(`Error verifying OTP for ${field}: ${error.message}`);
    return responseHandler(res, {
      data: null,
      status: "error",
      message: "Internal server error",
      statusCode: 500,
      error: error.message,
    });
  }
};
 
const ChangePassword = (Modal) => async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const response = await Modal.update(
            { password:await bcrypt.hash(password, 10) },
            { where: { email:email } }
        );

        return responseHandler(res, {
            data: null,
            status: "success",
            message: "Password reset successful",
            statusCode: 200,
        });
    } catch (error) {
        console.error(`Error resetting password: ${error.message}`);
        
        return responseHandler(res, {
            data: null,
            status: "error",
            message: "Internal server error",
            statusCode: 500,
            error: error.message,
        });
    }
};
const sendNotifymail = async (data,name) => {
  const getData =
  console.log(data);
  
  console.log(`Sending notification mail`);
  return sendEmail({
    to: "dheebablessy2000@gmail.com",
    subject: `Notification for ${name}`,
    html: name==="Issue"? emailTemplates.notificationTemplateIssue(data):emailTemplates.notificationTemplateExpense(data),
  });
};
module.exports = { sendEmail, sendOtpEmail, createOTPRecord, verifyOTP, ChangePassword,sendNotifymail };
 