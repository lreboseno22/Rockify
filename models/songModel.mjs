import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    audioFile: {
        type: String,
        required: true,
        trim: true
    }, 
    genre: {
        type: String,
        default: "Rock",
    }
})

const Song = mongoose.model("Song", songSchema);
export default Song;