import express from "express";

import * as controller from "../controllers/results.js"


const router = express.Router()


router.get('/', controller.getResults)


export default router
