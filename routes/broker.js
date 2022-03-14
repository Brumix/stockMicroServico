import express from "express";

import * as controller from "../controllers/broker.js"


const router = express.Router()

router.get('/', controller.getBroker)
router.get('/:name', controller.getBroker)
router.post('/', controller.postBroker)
router.put('/', controller.putBroker)
router.delete('/', controller.deleteBroker)


export default router
