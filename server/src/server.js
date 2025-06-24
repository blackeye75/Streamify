import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { connectDB } from './lib/db.js';

const app = express()
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173", // Update with your client URL
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(5001, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})