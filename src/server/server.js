const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Enhanced CORS configuration for deployment
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://gundeepmarwah.com",
  "https://www.gundeepmarwah.com",
];

// More permissive CORS setup with detailed logging
app.use(
  cors({
    origin: function (origin, callback) {
      // Log origins for debugging
      console.log("Request origin:", origin);

      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        console.warn(`CORS rejected origin: ${origin}`);
        // For troubleshooting, temporarily allow all origins
        // return callback(null, true);

        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${
      req.headers.origin || "No origin"
    }`
  );
  next();
});

app.use(bodyParser.json());

// Connect to MongoDB with improved error handling
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    // Log more details about the connection error
    if (err.name === "MongooseServerSelectionError") {
      console.error(
        "MongoDB server selection error - Check network/firewall settings"
      );
    }
  });

// Add connection event listeners for better diagnostics
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error during operation:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected - attempting to reconnect");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected successfully");
});

// Define MongoDB schemas and models
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
const Contact = mongoose.model("Contact", contactSchema);

// Create email transporter with more secure configuration and better error handling
let transporter;

// Check if we have email credentials before setting up transporter
if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    // Add these for more reliable connection
    tls: {
      rejectUnauthorized: false,
    },
    // Set timeout values to prevent hanging connections
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  // Verify transporter connection with more details
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Email transporter error:", error);
      console.error("Email config used:", {
        service: "gmail",
        user: process.env.EMAIL_USER ? "Set" : "Not set",
        pass: process.env.EMAIL_APP_PASSWORD ? "Set" : "Not set",
      });
    } else {
      console.log("✅ Email transporter is ready to send messages");
    }
  });
} else {
  console.warn(
    "⚠️ Email credentials not provided. Email functionality will be disabled."
  );
  console.warn("Required env vars:", {
    EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Not set",
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? "Set" : "Not set",
  });
}

// Helper function to safely send emails with enhanced error handling
const sendEmail = async (mailOptions) => {
  if (!transporter) {
    console.log(
      "📧 Email would be sent (credentials not configured):",
      mailOptions
    );
    return { success: false, error: "Email transport not configured" };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to: ${mailOptions.to}`, {
      messageId: info.messageId,
      response: info.response,
    });
    return { success: true, info: info.messageId };
  } catch (error) {
    console.error(`❌ Error sending email to ${mailOptions.to}:`, {
      message: error.message,
      code: error.code || "unknown",
      response: error.response || "no response",
      stack: error.stack,
    });
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }
};

// Subscribe endpoint with improved error handling
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  console.log(`Subscribe request received for: ${email}`);

  if (!email) {
    console.warn("Subscribe attempt without email");
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      console.log(`Subscribe attempt with existing email: ${email}`);
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // Create new subscriber in MongoDB
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    console.log(`✅ New subscriber: ${email}`);

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to My Portfolio Newsletter!",
      html: `
        <h1>Welcome to My Portfolio Newsletter!</h1>
        <p>Thank you for subscribing to my newsletter. You'll receive updates about my latest projects, blog posts, and more.</p>
        <p>Stay tuned for exciting content!</p>
        <br>
        <p>Best regards,</p>
        <p>Gundeep Marwah</p>
      `,
    };

    const emailResult = await sendEmail(mailOptions);
    if (!emailResult.success) {
      console.warn(
        `Welcome email failed for ${email}, but subscription was successful`
      );
      return res.status(201).json({
        success: true,
        message: "Subscription successful but welcome email could not be sent",
        emailError: emailResult.error,
      });
    }

    res.status(200).json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("❌ Subscription error:", {
      message: error.message,
      code: error.code || "unknown",
      stack: error.stack,
    });

    // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Email already subscribed",
        details: "This email is already in our database",
      });
    }

    res.status(500).json({
      error: "Failed to process subscription",
      details: error.message,
      code: error.code || "unknown",
    });
  }
});

// Contact form endpoint with improved error handling
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(`Contact form submission from: ${name} (${email})`);

  if (!name || !email || !subject || !message) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!subject) missingFields.push("subject");
    if (!message) missingFields.push("message");

    console.warn(`Contact form missing fields: ${missingFields.join(", ")}`);
    return res.status(400).json({
      error: "All fields are required",
      missing: missingFields,
    });
  }

  try {
    // Store contact in MongoDB
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();
    console.log(`✅ New contact form submission saved: ${name} (${email})`);

    // Send confirmation email to the person who submitted the form
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <h1>Thank you for reaching out!</h1>
        <p>Hello ${name},</p>
        <p>I've received your message regarding "${subject}" and I appreciate you taking the time to contact me.</p>
        <p>I'll review your message and get back to you as soon as possible.</p>
        <br>
        <p>Best regards,</p>
        <p>Gundeep Marwah</p>
      `,
    };

    // Send notification email to yourself about the new contact
    const notificationOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    const userEmailResult = await sendEmail(autoReplyOptions);
    const notificationResult = await sendEmail(notificationOptions);

    // Check for email sending failures but don't fail the whole request
    if (!userEmailResult.success || !notificationResult.success) {
      console.warn(`Email sending issues for contact from ${email}:`, {
        userEmail: userEmailResult,
        notification: notificationResult,
      });

      return res.status(201).json({
        success: true,
        message:
          "Your message was received but there were issues sending confirmation emails",
        emailError: !userEmailResult.success
          ? userEmailResult.error
          : notificationResult.error,
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Contact form error:", {
      message: error.message,
      code: error.code || "unknown",
      stack: error.stack,
    });

    res.status(500).json({
      error: "Failed to process your message",
      details: error.message,
      code: error.code || "unknown",
    });
  }
});

// Get all subscribers endpoint (for admin purposes) with more protection
app.get("/api/subscribers", async (req, res) => {
  // Simple API key validation for admin endpoints
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const subscribers = await Subscriber.find().sort({ date: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("❌ Error fetching subscribers:", error);
    res.status(500).json({
      error: "Failed to fetch subscribers",
      details: error.message,
    });
  }
});

// Get all contacts endpoint (for admin purposes) with more protection
app.get("/api/contacts", async (req, res) => {
  // Simple API key validation for admin endpoints
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res.status(500).json({
      error: "Failed to fetch contacts",
      details: error.message,
    });
  }
});

// Monthly Newsletter Cron Job (Runs on the 1st of each month)
cron.schedule("0 0 1 * *", async () => {
  try {
    console.log("📩 Preparing monthly newsletter emails...");

    // Get all subscribers from MongoDB
    const subscribers = await Subscriber.find();

    if (subscribers.length === 0) {
      return console.log("❌ No subscribers to send emails.");
    }

    const newsletterContent = {
      title: "Monthly Portfolio Updates",
      projects: [
        "New E-commerce Website",
        "Mobile App UI Design",
        "Blog Redesign",
      ],
      blogPosts: [
        "Modern Web Development Trends",
        "UI/UX Best Practices",
        "Productivity Tips for Developers",
      ],
      upcomingEvents: [
        "Virtual Meetup: Web Dev Talk",
        "Design Workshop",
        "Open Source Contribution Day",
      ],
    };

    const successfulEmails = [];
    const failedEmails = [];

    for (const subscriber of subscribers) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: "Monthly Portfolio Newsletter",
        html: `
          <h2>${newsletterContent.title}</h2>
          <p>Here are my latest updates:</p>
          
          <h3>New Projects</h3>
          <ul>
            ${newsletterContent.projects
              .map((project) => `<li>${project}</li>`)
              .join("")}
          </ul>
          
          <h3>Latest Blog Posts</h3>
          <ul>
            ${newsletterContent.blogPosts
              .map((post) => `<li>${post}</li>`)
              .join("")}
          </ul>
          
          <h3>Upcoming Events</h3>
          <ul>
            ${newsletterContent.upcomingEvents
              .map((event) => `<li>${event}</li>`)
              .join("")}
          </ul>
          
          <p>Stay tuned for more updates!</p>
          <p>Best regards,<br>Gundeep Marwah</p>
        `,
      };

      const emailResult = await sendEmail(mailOptions);
      if (emailResult.success) {
        successfulEmails.push(subscriber.email);
      } else {
        failedEmails.push({
          email: subscriber.email,
          error: emailResult.error,
        });
      }

      // Add a small delay between emails to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`✅ Monthly newsletter process completed:`);
    console.log(`- Successful: ${successfulEmails.length} emails`);
    if (failedEmails.length > 0) {
      console.warn(`- Failed: ${failedEmails.length} emails`);
      console.warn(`- Failed details:`, failedEmails);
    }
  } catch (error) {
    console.error("❌ Error sending newsletter emails:", {
      message: error.message,
      stack: error.stack,
    });
  }
});

// Enhanced Health check endpoint with service status
app.get("/api/health", async (req, res) => {
  try {
    // Check MongoDB connection
    const mongoStatus = mongoose.connection.readyState;
    let mongoStatusText;

    switch (mongoStatus) {
      case 0:
        mongoStatusText = "disconnected";
        break;
      case 1:
        mongoStatusText = "connected";
        break;
      case 2:
        mongoStatusText = "connecting";
        break;
      case 3:
        mongoStatusText = "disconnecting";
        break;
      default:
        mongoStatusText = "unknown";
    }

    // Check email service
    let emailStatus = "unconfigured";
    if (transporter) {
      try {
        await transporter.verify();
        emailStatus = "connected";
      } catch (error) {
        emailStatus = `error: ${error.message}`;
      }
    }

    // Check environment variables
    const envVars = {
      PORT: process.env.PORT ? "Set" : "Using default",
      MONGODB_URI: process.env.MONGODB_URI ? "Set" : "Not set",
      EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Not set",
      EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? "Set" : "Not set",
      ADMIN_API_KEY: process.env.ADMIN_API_KEY ? "Set" : "Not set",
    };

    res.status(200).json({
      status: "ok",
      uptime: process.uptime() + " seconds",
      timestamp: new Date().toISOString(),
      services: {
        mongo: mongoStatusText,
        email: emailStatus,
      },
      environment: envVars,
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Simple endpoint to test CORS
app.get("/api/cors-test", (req, res) => {
  res.status(200).json({
    message: "CORS is working correctly",
    origin: req.headers.origin || "No origin header",
    host: req.headers.host,
    timestamp: new Date().toISOString(),
  });
});

// Start server with better error handling
app
  .listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(
      `📝 Health check available at: http://localhost:${PORT}/api/health`
    );
    console.log(
      `📝 CORS test available at: http://localhost:${PORT}/api/cors-test`
    );
  })
  .on("error", (error) => {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  });

// Handle process termination gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  mongoose.connection
    .close()
    .then(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error closing MongoDB connection", err);
      process.exit(1);
    });
});
