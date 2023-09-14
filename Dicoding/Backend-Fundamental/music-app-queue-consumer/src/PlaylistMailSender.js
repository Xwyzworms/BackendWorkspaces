const nodemailer = require('nodemailer');

class PlaylistMailSender {
  constructor() {
    this.transporterEmail = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetMail, content) {
    const message = {
      from: process.env.MAIL_ADDRESS,
      to: targetMail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir playlist yang diminta',
      attachments: [{
        filename: 'data.json',
        content,
      }],
    };

    return this.transporterEmail.sendMail(message);
  }
}

module.exports = PlaylistMailSender;
