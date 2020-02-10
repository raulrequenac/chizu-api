const nodemailer = require('nodemailer');
const { PORT_ORIGIN } = require('../constants')

const APP_HOST = process.env.APP_HOST || PORT_ORIGIN

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass
  }
});

module.exports.sendValidateEmail = (targetUser) => {
  transporter.sendMail({
      from: `"Chizu" <${user}>`,
      to: targetUser.email,
      subject: 'Welcome to Chizu!',
      html: `
      <h1>Welcome</h1>
      <a href='${APP_HOST}/validate/${targetUser.validateToken}'>Confirm account</a>
    `
    })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}
