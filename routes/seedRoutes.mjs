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

        // Insert artists data
        const insertedArtists = await Artist.insertMany(artistsData);
        
        // Map artist name -> ID
        const artistMap = {};
        insertedArtists.forEach(a => {
            artistMap[a.name] = a._id;
        });

        // Replace artist names in albums with ObjectId
        const albumsWithRefs = albumsData.map(album => ({
            ...album,
            artist: artistMap[album.artist]
        }));

        // Insert albums data
        const insertedAlbums = await Album.insertMany(albumsWithRefs);

        // Map album title -> ID
        const albumMap = {};
        insertedAlbums.forEach(a => { albumMap[a.title] = a._id });

        // Replace artist/album names with ObjectId
        const songsWithRefs = songsData.map(song => ({
            ...song,
            artist: artistMap[song.artist],
            album: albumMap[song.album]
        }));

        // Insert songs data
        const insertedSongs = await Song.insertMany(songsWithRefs);

        // Map song title -> ID
        const songMap = {};
        insertedSongs.forEach(s => {
            songMap[s.title] = s._id;
        });

        // Replace song titles with ObjectId
        const playlistsWithRefs = playlistData.map(playlist => ({
            ...playlist,
            songs: playlist.songs.map(title => songMap[title])
        }));

        // Insert playlists data
        await Playlist.insertMany(playlistsWithRefs);

        res.json({ message: "Database seeded successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;