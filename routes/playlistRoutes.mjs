import express from "express";
import Playlist from "../models/playlistModel.mjs";

const router = express.Router();

// Get all playlists
router.get("/", async (req, res) => {
    try {
        const playlists = await Playlist.find()
        .populate("songs", "title -_id")
        .populate("user", "username -_id");
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get playlist by ID
router.get("/:id", async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
        .populate("songs", "title -_id")
        .populate("user", "username -_id");
        if(!playlist) return res.status(404).json({ error: "Playlist not found" });
        res.json(playlist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;