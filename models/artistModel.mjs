import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    bio: {
        type: String,
        trim: true
    },
    genre: {
        type: String,
        default: "Rock",
        enum: ["Rock", "Metal", "Hard Rock"]
    }
});

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;