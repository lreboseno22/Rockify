import express from "express";
import Artist from "../models/artistModel.mjs";

const router = express.Router();

// Get all artists
router.get("/", async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get artist by ID
router.get("/:id", async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if(!artist) return res.status(404).json({ error: err.message });
        res.json(artist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;