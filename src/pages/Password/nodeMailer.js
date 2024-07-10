import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const smtp = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const send = (to, subject, body) => {
    smtp.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body
    })
}

export default send