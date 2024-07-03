import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { connection } from './db.js';

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
    const query = `SELECT USER_EMAIL, USER_PASSWORD FROM USERS WHERE USER_EMAIL = ?`;
    const values = [userEmail];

    connection.query(query, values, async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length > 0) {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(userPassword, user.USER_PASSWORD);

            if (passwordMatch) {
                const token = jwt.sign({ email: userEmail }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
