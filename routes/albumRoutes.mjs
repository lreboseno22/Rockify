import express from "express";
import Album from "../models/albumModel.mjs";

const router = express.Router();

// Get all albums
router.get("/", async (req, res) => {
    try {
        const albums = await Album.find().populate("artist"); // populate artitsts
        res.json(albums);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get alubm by ID
router.get("/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate("artist");
        if(!album) return res.status(404).json({ error: "Album not found" });
        res.json(album);
    } catch {
        res.status(500).json({ error: err.message });
    }
});



export default router;