import express from "express";

import * as controller from "../controllers/positions.js"


const router = express.Router()


router.get('/', controller.getPositions)
router.post('/', controller.postPositions)
router.delete('/', controller.deletePositions)
router.post('/closePosition', controller.closePosition)


export default router
