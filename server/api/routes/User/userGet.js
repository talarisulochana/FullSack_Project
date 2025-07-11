
const express = require('express');

const User = require("../../models/User.js");
const router = express.Router();



router.get("/userGet", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;