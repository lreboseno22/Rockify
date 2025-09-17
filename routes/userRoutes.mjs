import express from "express";
import User from "../models/userModel.mjs"

const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// CREATE a new user
router.post("/", async (req, res) => {
    console.log("POST body:", req.body);
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

// READ all users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
})

// READ single user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// UPDATE a user by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

export default router;