const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

let sender = '****@gmail.com';
let receiver = '****@gmail.com';

module.exports.send = function (message) {
    let transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: 'gmail',
        secure: false,
        auth: {
            user: sender,
            pass: '****'
        }
    }));

    var mailOptions = {
        from: sender,
        to: receiver,
        subject: 'LR_06',
        text: `Message info:${new Date().toLocaleString()}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        error ? console.log(error) : console.log('Email sent: ' + info.response);
    })
};