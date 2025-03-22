
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for emails (replace with MongoDB in production)
const subscribers = [];
const contacts = [];

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-password",
  },
});

// Subscribe endpoint
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    // Check if email already exists
    const existingEmail = subscribers.find(sub => sub === email);
    if (existingEmail)
      return res.status(400).json({ error: "Email already subscribed" });

    // Add email to subscribers
    subscribers.push(email);
    console.log(`✅ New subscriber: ${email}`);

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: email,
      subject: "Welcome to My Portfolio Newsletter!",
      html: `
        <h1>Welcome to My Portfolio Newsletter!</h1>
        <p>Thank you for subscribing to my newsletter. You'll receive updates about my latest projects, blog posts, and achievements.</p>
        <p>Stay tuned for exciting content!</p>
        <br>
        <p>Best regards,</p>
        <p>Gundeep Marwah</p>
      `,
    };

    // Comment out the actual sending in development to avoid errors
    // await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email would be sent to:", email);

    res.status(200).json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("❌ Subscription error:", error);
    res.status(500).json({ error: "Failed to process subscription" });
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Store contact in memory (replace with database in production)
    contacts.push({ name, email, subject, message, date: new Date() });
    console.log(`✅ New contact form submission from: ${name} (${email})`);

    // Send confirmation email to the person who submitted the form
    const autoReplyOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
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

    // Comment out the actual sending in development to avoid errors
    // await transporter.sendMail(autoReplyOptions);
    console.log("✅ Auto-reply email would be sent to:", email);

    // Send notification email to yourself about the new contact
    const notificationOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: process.env.EMAIL_USER || "your-email@gmail.com",
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

    // Comment out the actual sending in development to avoid errors
    // await transporter.sendMail(notificationOptions);
    console.log("✅ Notification email would be sent to you about this contact");

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({ error: "Failed to process your message" });
  }
});

// Monthly Newsletter Cron Job (Runs on the 1st of each month)
cron.schedule("0 0 1 * *", async () => {
  try {
    console.log("📩 Sending monthly newsletter emails...");

    if (subscribers.length === 0)
      return console.log("❌ No subscribers to send emails.");

    const newsletterContent = {
      title: "Monthly Portfolio Updates",
      projects: ["New E-commerce Website", "Mobile App UI Design", "Blog Redesign"],
      blogPosts: ["Modern Web Development Trends", "UI/UX Best Practices", "Productivity Tips for Developers"],
      upcomingEvents: ["Virtual Meetup: Web Dev Talk", "Design Workshop", "Open Source Contribution Day"],
    };

    // Comment out the actual sending in development
    /*
    const emailPromises = subscribers.map((email) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Monthly Portfolio Newsletter",
        html: `
          <h2>${newsletterContent.title}</h2>
          <p>Here are my latest updates:</p>
          
          <h3>New Projects</h3>
          <ul>
            ${newsletterContent.projects.map(project => `<li>${project}</li>`).join('')}
          </ul>
          
          <h3>Latest Blog Posts</h3>
          <ul>
            ${newsletterContent.blogPosts.map(post => `<li>${post}</li>`).join('')}
          </ul>
          
          <h3>Upcoming Events</h3>
          <ul>
            ${newsletterContent.upcomingEvents.map(event => `<li>${event}</li>`).join('')}
          </ul>
          
          <p>Stay tuned for more updates!</p>
          <p>Best regards,<br>Gundeep Marwah</p>
        `,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    */
    console.log("✅ Monthly newsletter would be sent to all subscribers!");
  } catch (error) {
    console.error("❌ Error sending newsletter emails:", error);
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
