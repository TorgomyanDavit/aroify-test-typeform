import express from 'express';
import session from "express-session";
import http from "http";
import cors from "cors";
import passport  from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { DB } from './typeOrm';
import { Bank } from './model/Bank';
import { Account } from './model/Account';
import { Currency } from './model/Currency';
dotenv.config();



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
app.use(express.static("public"));





app.get("/getData", async (req, res) => {
  const person = await DB.manager.find(Account)
  return res.send({ success: true, message: person });
});

app.get("/createAccount", async (req, res) => {
  const body = {
    bankName: "string",
    accountNumber: "string",
    currency: {
      isoCode: "AMD",
      countryOrigin: "Armenia",
      signCharacter: "֏" 
    },
    accountName: "Davit"
  }

  try {
    const IsoCode = await DB.manager.findOne(Currency, {where: {isoCode: body.currency.isoCode}});

    if (!IsoCode) {
      const newCurrency = new Currency();
      newCurrency.isoCode = body.currency.isoCode;
      newCurrency.countryOrigin = body.currency.countryOrigin; 
      newCurrency.signCharacter = body.currency.signCharacter; 
    
      await DB.manager.save(newCurrency);

      console.log('New currency added:', newCurrency);
    } else {
      console.log('currency already exist');
    }
    

    console.log(IsoCode?.countryOrigin)
  } catch(err) {
    console.log(err)
  }


  return res.send({ success: true, message: 'person' });
});

server.listen(process.env.BACKEND_PORT || 8000, () => {
  console.log(`PORT work -> ${process.env.BACKEND_PORT}`);
});