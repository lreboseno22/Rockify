import express from "express";
import Song from "../models/songModel.mjs";

const router = express.Router();

// Get all songs 
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find().populate("artist", "name genre bio -_id").populate("album", "title releaseDate coverImage -_id"); // look cleaner when requesting in json
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get song by ID
router.get("/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id).populate("artist", "name genre bio -_id").populate("album", "title releaseDate coverImage -_id");
        if(!song) return res.status(404).json({ error: "Song not found" });
        res.json(song);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;