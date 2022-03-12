import express from "express";

import * as controller from "../controllers/stocks.js"


const router = express.Router()


router.get('/', controller.getStocks)




export default router
