import express, { Request, Response } from "express";
import { getCurrency } from "../utils/addFunction";
import { Currency } from "../model/Currency";
import { DB } from "../typeOrm";
import { Bank } from "../model/Bank";
import { Account } from "../model/Account";
const router = express.Router();

router.post("/create", async (req, res) => {
    const {accountNumber,accountName,bankName,currency} = req.body
    const {countryOrigin,isoCode,signCharacter} = getCurrency(currency)
    let currensyId:number;
  
    async function AddNewCurrency() {
      const row = await DB.createQueryBuilder().insert().into(Currency)
      .values({
        isoCode: isoCode,
        countryOrigin: countryOrigin,
        signCharacter: signCharacter,
      })
      .execute()
      currensyId = row.identifiers[0].currency_id
      console.log('New currency added:', row);
    }
  
    async function AddAccount() {
      const findBankId = await DB.manager.findOne(Bank,{where: {bankName: bankName}})
      const newAccount = await DB.createQueryBuilder().insert().into(Account)
      .values({
        accountNumber: accountNumber,
        accountName: accountName,
        bank_id: findBankId?.bank_id,
        currency_id: currensyId,
      })
      .execute()
      console.log('New Account added:', newAccount);
    }
  
    try {
      const IsoCode = await DB.manager.findOne(Currency, {where: {isoCode: isoCode}});
      if (!IsoCode) {
        await AddNewCurrency()
        await AddAccount()
      } else {
        currensyId = IsoCode.currency_id
        await AddAccount()
        console.log('currency already exist');
      }
  
    } catch(err) {
      console.log(err)
    }
  
    return res.send({ success: true, message: 'person' });
});

router.get("/:bankId", async (req: Request, res: Response) => {

  try {
    const bankId = parseInt(req.params.bankId, 10);
    const accounnts = await DB.manager.find(Account,{
      where: { bank_id: bankId}
    })

    if (!accounnts) {
      return res.status(404).json({ success: false, message: 'Bank not found' });
    }

    return res.status(200).json({ success: true, message: 'Bank found', data: accounnts });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


export default router;
