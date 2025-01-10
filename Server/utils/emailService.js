import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  service: process.env.EMAIL_SERVICE, // Use your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: "anishsaini909886@gmail.com",
    to,
    subject,
    html: message, 
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
