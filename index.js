const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000; // Change as needed

app.use(cors());
app.use(express.json());

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // e.g., 'gmail', 'yahoo', etc.
  secure: true,
  auth: {
    user: "victoraremu123@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
    type: "login",
  },
  port: 465,
});

// API endpoint to send emails
app.post("/send-email", (req, res) => {
  console.log(req.body);
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: "victoraremu123@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Email sent successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
