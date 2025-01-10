
import { sendEmail } from '../utils/emailService.js';

const mailSender = () => async (req, res) => {
  const { name, email, courseEnrolled } = req.body;

  try {
    // Send the email directly
    const emailMessage = `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for registering for the <strong>${courseEnrolled}</strong> course.</p>
      <p>We wish you all the best in your learning journey!</p>
    `;
    await sendEmail(email, 'Registration Successful', emailMessage);

    // Respond to the client
    res.status(200).json({ message: 'Registration email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send registration email.' });
  }
};

export default mailSender;
