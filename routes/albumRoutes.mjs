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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post new album
router.post("/", async (req, res) => {
    try {
        const newAlbum = new Album(req.body);
        const savedAlbum = await newAlbum.save();
        res.status(201).json({ savedAlbum });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Put update album
router.put("/:id", async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedAlbum) return res.status(404).json({ error: "Album not found" });
        res.json(updatedAlbum);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// Delete album
router.delete("/:id", async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if(!deletedAlbum) return res.status(404).json({ error: "Album not found" });
        res.json({ message: "Album deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;