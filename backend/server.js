import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import { connection } from './db.js';

const app = express();
const SECRET_KEY = 'logged';

app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use(cookieParser())

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
            return res.status(500).send({ error: 'Erro no servidor' });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        const user = results[0];

        if (user.USER_PASSWORD === userPassword) {
            const token = jwt.sign({ email: userEmail }, SECRET_KEY, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });

            res.status(200).send({ message: 'Login realizado', token });
        } else {
            console.log('pé')
        }
    });
});

app.post('/users/getEmail', (req, res) => {
    const { userEmail } = req.body;

    console.log("Dados recebidos:", userEmail)

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

        if (results.length > 0) {
            const user = results[0];

            console.log("User:", user)
            console.log("Results:", results)
            res.status(200).send(results);
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

app.post('/users/changePassword', (req, res) => {
    const { userPassword, userEmail } = req.body

    const query = `
    UPDATE USERS
    SET USER_PASSWORD = ?
    WHERE USER_EMAIL = ?;
    `

    const values = [userPassword, userEmail]

    connection.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
})

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
