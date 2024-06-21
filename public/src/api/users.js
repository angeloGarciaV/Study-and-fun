const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../database/');

router.post('/register',
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
    body('email').isEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
            res.status(201).json({ message: "User created", userId: result.insertId });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error: error.message });
        }
    });

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const { email, password } = req.body;
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) return res.status(400).json({ message: "Email no encontrado" });

        const validPass = await bcrypt.compare(password, user[0].password);
        if (!validPass) return res.status(400).json({ message: "Contraseña inválida" });

        const token = jwt.sign({ id: user[0].id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({ token: token });
    });

module.exports = router;
