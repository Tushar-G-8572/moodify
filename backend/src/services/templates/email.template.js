const registrationTemplate = (name) => {
  const subject = "🎵 Welcome to Moodify – Let the Music Begin!";

  const text = `
Hi ${name},

Welcome to Moodify 🎶

Your journey into endless music starts now!
Discover new tracks, create playlists, and vibe with your favorite beats.

If you have any questions, feel free to contact us anytime.

Stay tuned,
Team Moodify
  `;

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 30px; text-align: center;">
      
      <h1 style="color: #1DB954;">🎵 Welcome to Moodify</h1>
      
      <p style="font-size: 16px; color: #333;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size: 16px; color: #555;">
        Your journey into endless music starts now! 🎶
      </p>

      <p style="font-size: 15px; color: #777;">
        Discover new tracks, create playlists, and vibe with your favorite beats.
      </p>

      <a href="#" 
         style="display: inline-block; margin-top: 20px; padding: 12px 25px; 
                background-color: #1DB954; color: white; text-decoration: none; 
                border-radius: 25px; font-weight: bold;">
         Start Listening 🎧
      </a>

      <p style="margin-top: 30px; font-size: 12px; color: #999;">
        Stay Tuned,<br/>
        Team Moodify
      </p>
    </div>
  </div>
  `;

  return { subject, text, html };
};

module.exports = {registrationTemplate};