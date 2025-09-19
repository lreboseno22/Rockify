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
        res.status(500).json({ error: err.message });
    }
});

// Post playlist
router.post("/", async (req, res) => {
    try {
        const newPlaylist = new Playlist(req.body);
        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(savedPlaylist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Update patch playlist : only renaming adding/removing songs
router.patch("/:id", async (req, res) => {
  try {
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
        ).populate("songs", "title -_id").populate("user", "username -_id");

        if(!updatedPlaylist) return res.status(404).json({ error: "Playlist not found" });
        res.json(updatedPlaylist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Delete playlist
router.delete("/:id", async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
        if(!deletedPlaylist) return res.status(404).json({ error: "Playlist not found" });
        res.json({message: "Playlist deleted"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;