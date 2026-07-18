import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes';
import userRoutes from './routes/user.route';
import interviewRoutes from './routes/interview.route';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1",indexRoutes)
app.use("/api/v1",userRoutes)
app.use("/api/v1/interviews",interviewRoutes)
export default app;