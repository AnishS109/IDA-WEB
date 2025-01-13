import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: 465,
  secure: true,
  service: 'gmail', // Use your preferred email service
  auth: {
    user: "anishsaini909886@gmail.com", // Your email address
    pass: "qeslzuxmymvtnvgo", // Your email password or app-specific password
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
