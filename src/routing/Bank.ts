import express, { Request, Response } from "express";
import { getCurrency } from "../utils/addFunction";
import { Currency } from "../model/Currency";
import { DB } from "../typeOrm";
import { Bank } from "../model/Bank";
import { Account } from "../model/Account";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const foundBank = await DB.manager.find(Bank);
    return res.send({ success: false, message: 'Banks found',data:foundBank });
});

export default router;
