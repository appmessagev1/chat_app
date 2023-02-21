const nodemailer = require('nodemailer')
require('dotenv').config()

const nodemailerService = {
  sendMail: (to, subject, htmlContent) => {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const options = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    return transport.sendMail(options)
  }
}

module.exports = nodemailerService