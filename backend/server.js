import express from 'express';
import { connection } from './db.js';

const app = express();

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
    INSERT INTO
    USERS (USER_EMAIL, USER_PASSWORD)
    VALUES (?, ?)`;
    const values = [userEmail, userPassword];

    connection.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json(results);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
