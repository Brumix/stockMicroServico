import express from "express";

import * as controller from "../controllers/user.js"


const router = express.Router()


router.get('/', controller.getUser)
router.post('/', controller.postUser)
router.put('/', controller.putUser)
router.delete('/', controller.deleteUser)


export default router
