import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(',');
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))

scheduleCron();

import userRouter from "./routes/user.routes.js"
import campaignRouter from "./routes/campaign.routes.js";
import requestRouter from "./routes/request.routes.js";
import { scheduleCron } from "./cron-schedules.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/campaign", campaignRouter);
app.use("/api/v1/request", requestRouter);

export { app };