import express from "express";
import dotenv from "dotenv";
import globalErr from "./middleware/globalErr.mjs";
import log from "./middleware/logger.mjs";
import connectDB from "./db/connect.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import seedRoutes from "./routes/seedRoutes.mjs";

// SETUP
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// DB CONNECTION
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(log);

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/seed", seedRoutes);

// GLOBAL ERROR
app.use(globalErr);

// LISTENER
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
})