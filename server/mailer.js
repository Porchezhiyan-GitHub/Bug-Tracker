const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "porchezhiyan.e@outlook.com",
    pass: "7462121107Aa@",
  },
});

const link = "http://localhost:9000/" + "api/users/activate"; //to do make constant

var message = {
  from: "porchezhiyan.e@outlook.com",
  to: "",
  subject: "Projectile: Please confirm your email id!",
  html: "",
};

module.exports = async (email, link) => {
  try {
    newMessage = {
      ...message,
      to: email,
      html: `Hello,<br> Please Click on the link to verify your email.<br> <a href=\"${link}\" >Click here to verify</a>`,
    };
    console.log(newMessage);
    await transporter.sendMail(newMessage);
  } catch (ex) {
    console.log(ex);
  }
};
