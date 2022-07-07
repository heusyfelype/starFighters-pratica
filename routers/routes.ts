import { Router } from "express";

import battleController from "../controllers/battleController.js";

const router = Router();

router.post("/battle", battleController.postBattle);
router.get("/ranking", battleController.getRanking);


export default router;