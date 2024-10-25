const nodemailer = require('nodemailer');
require('dotenv').config();



console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: false, // true for 465, false for other ports
    tls: {
        rejectUnauthorized: false
    }


});



const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

const sendLeadAlert = async (leadCount) => {
    if (leadCount > 100) { // Example condition
        const subject = 'Lead Alert';
        const text = `Total leads have exceeded the threshold: ${leadCount}`;
        await sendEmail(process.env.EMAIL_RECIVER, subject, text);
    }
};

module.exports = { sendEmail, sendLeadAlert };
