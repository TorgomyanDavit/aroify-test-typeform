import express, { Request, Response } from 'express';
import session from "express-session";
import path from "path";
import http from "http";
import cors from "cors";
import { createPool } from "mysql2/promise";
import passport  from "passport";
import bodyParser, { json } from "body-parser";
import jsonwebtoken from "jsonwebtoken"
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { DataTypes, Sequelize } from 'sequelize';
import  Employee  from './model/employee';


dotenv.config();

interface EmployeeAttributes {
  id?: number;
  first_name: string;
  last_name?: string | null;
  job_title?: string | null;
  salary?: number | null;
}
export const pool = createPool({
  host: process.env.db_host, // Replace with your host name
  user: process.env.db_user, // Replace with your root name
  password: process.env.db_password, // Replace with your database password
  database: process.env.db_name, // Replace with your database Name
  multipleStatements: true
});

export const app = express();
const server = http.createServer(app);

app.use(session({
  // cookie: { expires : new Date(Date.now() + 3600000) },
  secret: process.env.SESSION_SECRET as string,
  resave: true,
  saveUninitialized: true
}));

app.use(cors({
  origin: [
    "https://www.holtrinity.com",
    "https://holtrinity.com",
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
app.use("/public/images",express.static("./public/images"));



app.get("/getData", async (req, res) => {
  // const employees = await Employee.findAll();

  // const employeeCount = await Employee.count();
  const limitedEmployeeNames = await Employee.findAll({
    attributes: ['first_name'],
    order: [['salary', 'ASC']],
    limit: 4,
  });


  return res.send({ success: true, message: limitedEmployeeNames });

});

app.get('/insert', async (req: Request, res: Response) => {
  const employeeData: any = {
    first_name: 'John',
    last_name: 'Doe',
    job_title: 'Software Engineer',
    salary: 80000.0,
  };

  try {
    const employee = await Employee.create(employeeData);
    return res.send({ success: true, message: employee });
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});


server.listen(process.env.BACKEND_PORT || 8000, () => {
  console.log(`PORT work -> ${process.env.BACKEND_PORT}`);
});