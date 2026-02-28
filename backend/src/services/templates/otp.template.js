const otpTemplate = (name, otp) => {
  const subject = "🔐 Verify Your Moodify Account – OTP Inside";

  const text = `
Hi ${name},

Your OTP for verifying your Moodify account is:

${otp}

This OTP is valid for 5 minutes.

If you did not request this, please ignore this email.

Stay tuned,
Team Moodify 🎵
  `;

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; padding: 30px; text-align: center;">
      
      <h1 style="color: #1DB954; margin-bottom: 10px;">
        🎵 Moodify
      </h1>

      <h2 style="color: #333;">Account Verification</h2>

      <p style="font-size: 16px; color: #555;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size: 15px; color: #777;">
        Use the OTP below to verify your account:
      </p>

      <div style="
          margin: 20px auto;
          padding: 15px 25px;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 5px;
          background-color: #1DB954;
          color: white;
          display: inline-block;
          border-radius: 8px;
      ">
        ${otp}
      </div>

      <p style="font-size: 14px; color: #999;">
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <p style="font-size: 12px; color: #bbb; margin-top: 30px;">
        If you did not request this, you can safely ignore this email.
      </p>

      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        Stay Tuned,<br/>
        Team Moodify 🎧
      </p>

    </div>
  </div>
  `;

  return { subject, text, html };
};

module.exports = otpTemplate;