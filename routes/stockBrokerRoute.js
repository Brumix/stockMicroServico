import express from "express";

import * as controller from "../controllers/stockBroker.js"


const router = express.Router()


router.get('/broker', controller.getBrokersFromStock)
router.get('/stock', controller.getStocksFromBroker)
router.post('/associate', controller.associateStockBroker)
router.delete('/disassociate', controller.disassociateStockBroker)


export default router
