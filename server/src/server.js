import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';

const app = express()
const PORT= process.env.PORT || 5001;

app.use("/api/auth",authRoutes)

app.listen(5001,()=>{
    console.log(`Server is running on port ${PORT}`)
})