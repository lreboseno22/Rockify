import express from "express";

import Artist from "../models/artistModel.mjs";
import Album from "../models/albumModel.mjs";
import Song from "../models/songModel.mjs";
import Playlist from "../models/playlistModel.mjs";

import artistsData from "../data/artists.mjs";
import albumsData from "../data/albums.mjs";
import songsData from "../data/songs.mjs";
import playlistData from "../data/playlists.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const testRun = req.query.test === "true";
        const reset = req.query.reset === "true";

        if(testRun){
            return res.json({
                artists: artistsData,
                albums: albumsData,
                songs: songsData,
                playlists: playlistData,
                note: "Test run: No data inserted"
            });
        }

        if(reset){
          await Promise.all([
            Artist.deleteMany({}),
            Album.deleteMany({}),
            Song.deleteMany({}),
            Playlist.deleteMany({})
        ]);
        }

        // Insert data
        const insertedArtists = await Artist.insertMany(artistsData);
        
        // Map artist name with ID for handling relationships between albums and songs
        const artistMap = {};
        insertedArtists.forEach(a => {
            artistMap[a.name] = a._id;
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;