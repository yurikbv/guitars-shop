const nodemailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');
const { resetPass } = require('./resetPass');
require('dotenv').config();

const getEmailData = (to,name,token,type,actionData) => {

  let data = null;

  switch (type) {
    case 'welcome':
      data = {
        from: '"Waves" <yuriybochkarevv@gmail.com>', // sender address
        to, // list of receivers
        subject: `Welcome to Waves ${name}`, // Subject line
        html: welcome() // html body
      };
      break;
    case 'purchase':
      data = {
        from: '"Waves" <yuriybochkarevv@gmail.com>', // sender address
        to, // list of receivers
        subject: `Thanks for shopping with us ${name}`, // Subject line
        html: purchase(actionData) // html body
      };
      break;
    case 'reset_password':
      data = {
        from: '"Waves" <yuriybochkarevv@gmail.com>', // sender address
        to, // list of receivers
        subject: `${name} reset your password`, // Subject line
        html: resetPass(actionData) // html body
      };
      break;
    default:
      data = null;
  }

  return data;
};

const sendEmail = (to,name,token,type,actionData = null) => {
  let smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "yuriybochkarevv@gmail.com",
      pass: process.env.MAILER_PASS
    }
  });

  const mail = getEmailData(to,name,token,type,actionData);

  smtpTransporter.sendMail(mail, function (error, response) {
    if(error) {console.log(error)}
    else console.log('Email sent');
    smtpTransporter.close();
  });
};

module.exports = { sendEmail };