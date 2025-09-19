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
});

// Update (put) artist
router.put("/:id", async (req, res) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!updatedArtist) return res.status(404).json({ error: "Artist not found"});
        res.json(updatedArtist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete artist
router.delete("/:id", async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
        if(!deletedArtist) return res.status(404).json({ error: "Artist not found" });
        res.json({ message: "Artist deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;