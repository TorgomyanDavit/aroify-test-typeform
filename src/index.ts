import express, { Request, Response } from 'express';
import session from "express-session";
import http from "http";
import cors from "cors";
import passport  from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
// import AccountRouter from "./routing/Account"
// import BankRouter from "./routing/Bank"
import { RunRedisConnection, redisClient } from './redisdbinitialize';
dotenv.config();
export const app = express();
const server = http.createServer(app);

RunRedisConnection();
app.use(session({
  // cookie: { expires : new Date(Date.now() + 3600000) },
  secret: process.env.SESSION_SECRET as string,
  resave: true,
  saveUninitialized: true
}));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4000',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials:true,
  optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

app.get("/", async (req: Request, res: Response) => {
  try {
      const data = await redisClient.get("name")
      console.log(data,"data")
  } catch (error) {
      console.error('Error fetching banks:', error);
      return res.status(500).send({ success: false, message: 'Internal server error' });
  }
});
// app.use("/accounts",AccountRouter)
// app.use("/banks",BankRouter)

server.listen(process.env.BACKEND_PORT || 8000, () => {
  console.log(`PORT work -> ${process.env.BACKEND_PORT}`);
});