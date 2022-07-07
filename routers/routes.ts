import { Router } from "express";

import battleController from "../controllers/battleController.js";
import { postFightersMiddlaware } from "../middlewares/postFightersMiddlaware.js";


const router = Router();

router.post("/battle", postFightersMiddlaware, battleController.postBattle);
router.get("/ranking", battleController.getRanking);


export default router;