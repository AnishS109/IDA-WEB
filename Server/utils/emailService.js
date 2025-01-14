import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: 465,
  secure: true,
  service: 'gmail', 
  auth: {
    user: "anishsaini909886@gmail.com", 
    pass: "qeslzuxmymvtnvgo", 
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
