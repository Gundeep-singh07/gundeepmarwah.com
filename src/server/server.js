const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Improved CORS configuration
app.use(
  cors({
    origin: "*", // Allows requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define MongoDB schemas
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  date: { type: Date, default: Date.now },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Email configuration
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  transporter.verify((error, success) => {
    if (error) console.error("❌ Email transporter error:", error);
    else console.log("✅ Email transporter ready");
  });
} else {
  console.warn(
    "⚠️ Email credentials not provided. Email functionality disabled."
  );
}

// Safe email sending function
const sendEmail = async (mailOptions) => {
  if (!transporter) {
    console.warn("📧 Email transporter is not configured");
    return false;
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to: ${mailOptions.to}`);
    return true;
  } catch (error) {
    console.error(`❌ Email sending error to ${mailOptions.to}:`, error);
    return false;
  }
};

// Subscribe API
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Check if the email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber)
      return res.status(400).json({ error: "Email already subscribed" });

    // Save the new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    console.log(`✅ New subscriber: ${email}`);

    // Send a welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to My Portfolio Newsletter!",
      html: `<h1>Welcome!</h1><p>Thank you for subscribing to my newsletter. You'll receive updates soon.</p>`,
    };

    await sendEmail(mailOptions);

    res.status(200).json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("❌ Subscription error:", error);
    res.status(500).json({ error: "Failed to process subscription" });
  }
});

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
