import mongoose from "mongoose";

const albumSchema= new mongoose.Schema({
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
    releaseDate: {
        type: Date
    }, 
    coverImage: {
        "type": String,
        trim: true
    },
    genre: {
        type: String,
        default: "Rock"
    }
})

const Album = mongoose.model("Album", albumSchema);
export default Album;