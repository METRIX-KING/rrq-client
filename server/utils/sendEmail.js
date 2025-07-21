const axios = require('axios');
const qs = require('qs');

const sendResetEmail = async (email, token) => {
  const domain = process.env.MAILGUN_DOMAIN;
  const apiKey = process.env.MAILGUN_API_KEY;
  const resetUrl = \`\${process.env.RESET_REDIRECT_URL}/\${token}\`;

  const data = qs.stringify({
    from: \`Admin Panel <noreply@\${domain}>\`,
    to: email,
    subject: 'Password Reset',
    text: \`Reset your password: \${resetUrl}\`
  });

  const auth = {
    username: 'api',
    password: apiKey
  };

  try {
    await axios.post(\`https://api.mailgun.net/v3/\${domain}/messages\`, data, {
      auth,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return true;
  } catch (error) {
    console.error("Email failed:", error.message);
    return false;
  }
};

module.exports = sendResetEmail;
