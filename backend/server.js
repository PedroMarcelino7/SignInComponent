import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { connection } from './db.js';

dotenv.config();

const app = express();
const SECRET_KEY = 'logged';

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM USERS', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/users/post', (req, res) => {
    const { userEmail, userPassword } = req.body;
    const query = `
    INSERT INTO USERS (USER_EMAIL, USER_PASSWORD)
    VALUES (?, ?)`;
    const values = [userEmail, userPassword];

    connection.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json(results);
    });
});

app.post('/users/get', (req, res) => {
    const { userEmail, userPassword } = req.body;
    console.log('Dados recebidos:', userEmail, userPassword);
    const query = `SELECT USER_EMAIL, USER_PASSWORD FROM USERS WHERE USER_EMAIL = ?`;
    const values = [userEmail];

    connection.query(query, values, async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length > 0) {
            const user = results[0];

            if (userPassword == user.USER_PASSWORD) {
                const token = jwt.sign({ email: userEmail }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).send({ token });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

app.post('/users/googleauth', (req, res) => {
    const { userEmail } = req.body;
    const query = `
        SELECT USER_EMAIL 
        FROM USERS 
        WHERE USER_EMAIL = ?
        `;
    const values = [userEmail];

    connection.query(query, values, async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length == 0) {
            const queryPost = `
                INSERT INTO
                USERS (USER_EMAIL, USER_PASSWORD)
                VALUES (?, '')
            `

            const values = [userEmail]

            connection.query(queryPost, values, async (err, results) => {
                if (err) {
                    return res.status(500).send(err)
                }

                const token = jwt.sign({ email: userEmail }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).send({ token });
            })
        } else if (results.length > 0) {
            const user = results[0];

            const token = jwt.sign({ email: userEmail }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).send({ token });
        } else {
            res.status(404).send('Error');
        }
    });
});

const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
