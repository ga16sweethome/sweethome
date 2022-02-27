"use strict";
const nodemailer = require("nodemailer");

module.exports = {
  sendmail: async (email, subject, content) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.ID_EMAIL, // generated ethereal user
        pass: process.env.PASS_EMAIL, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Sweethome Design" <no-reply@sweethome.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "", // plain text body
      html: content, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  },
};
