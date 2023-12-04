import express, { Request, Response } from "express";
import { DB } from "../typeOrm";
import { Bank } from "../model/Bank";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const foundBank = await DB.manager.find(Bank);
    return res.send({ success: true, message: 'Banks found',data:foundBank });
});

export default router;
