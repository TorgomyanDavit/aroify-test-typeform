import express, { Request, Response } from "express";
import { DB } from "../dbInitialize";
import { Bank } from "../model/Bank";
import { redisClient } from "../redisdbinitialize";
const router = express.Router();



router.get("/", async (req: Request, res: Response) => {
    try {
        const data = await redisClient.get("name")
        console.log(data,"data")
        const foundBank = await DB.manager.find(Bank);
        return res.send({ success: true, message: 'Banks found', data: foundBank });
    } catch (error) {
        console.error('Error fetching banks:', error);
        return res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

export default router;