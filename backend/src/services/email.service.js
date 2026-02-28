const transporter = require('../config/email.config');
const {registrationTemplate} = require('./templates/email.template');
const otpTemplate = require('./templates/otp.template');

const sendEmail = async function({ to, subject, text, html }) {
  try {
    console.log("Sending to:", to);

    const info = await transporter.sendMail({
      from: `Moodify music player <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log("Message Sent:", info.messageId);

  } catch (err) {
    console.log("Error sending email", err);
    throw err;
  }
};

const sendRegistrationEmail = async (username,email) => {
  const { subject, text, html } = registrationTemplate(username);

  return sendEmail({
    to: email,
    subject,
    text,
    html,
  });
};

const sendOTP = async(email,username,otp)=>{
  const {subject,text,html} = otpTemplate(username,otp);

  return sendEmail({
    to:email,
    subject,
    text,
    html
  });

}

module.exports = {
  sendRegistrationEmail,
  sendOTP
};