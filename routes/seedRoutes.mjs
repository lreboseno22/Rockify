import express from "express";
import mongoose from "mongoose";

import User from "../models/userModel.mjs";
import Artist from "../models/artistModel.mjs";
import Album from "../models/albumModel.mjs";
import Song from "../models/songModel.mjs";
import Playlist from "../models/playlistModel.mjs";

import artistsData from "../data/artists.mjs";
import albumsData from "../data/albums.mjs";
import songsData from "../data/songs.mjs";
import playlistData from "../data/playlists.mjs";

const router = express.Router();

router.get("/seed", async (req, res) => {
    try {
        await Promise.all([
            User.deleteMany({}),
            Artist.deleteMany({}),
            Album.deleteMany({}),
            Song.deleteMany({}),
            Playlist.deleteMany({})
        ]);

        const users = await User.insertMany([
            { username: "liam", email: "liam@example.com", password: "123" },
            { username: "rockifyGuest", email: "rocify@example.com", password: "abc" }
        ]);

    } catch (err) {

    }
})