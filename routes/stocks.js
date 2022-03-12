import express from "express";

import * as controller from "../controllers/stocks.js"


const router = express.Router()


router.get('/', controller.getStocks)
router.get('/:name', controller.getStocks)
router.post('/', controller.postStocks)
router.put('/', controller.putStocks)
router.delete('/', controller.deleteStocks)


export default router
