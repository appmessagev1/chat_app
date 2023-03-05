const Mailgen = require("mailgen");
require("dotenv").config();

const genMail = data => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "App message",
      link: process.env.CLIENT_API_URL,
    },
  });

  const email = {
    body: {
      name: data.email,
      intro: "Welcome to App message! We’re very excited to have you on board.",
      action: {
        instructions: "To get started with App message, please click here:",
        button: {
          color: "green",
          text: "Confirm Your Account",
          link: data.link,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = mailGenerator.generate(email);

  return emailBody;
};

module.exports = genMail;
