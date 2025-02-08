const express = require("express");
const UserDAO = require("../dao/UserDAO");

const router = express.Router();

// Save a new user
router.post("/save", async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await UserDAO.insertUser(name, email);
        res.json({ message: "User saved", id: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await UserDAO.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
