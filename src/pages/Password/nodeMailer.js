import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/users/recover', async (req, res) => {
    const { email } = req.body;

    const configEmail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Teste',
        html: '<p>Este é um email de teste.</p>',
    };

    try {
        await smtp.sendMail(configEmail);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});