import { Request, Response } from "express";

import starfightersService from "../services/starfightersService.js"

async function postBattle(req:Request, res:Response) {
    const {firstUser, secondUser} = req.body
    
    console.log("post battle funcionando")
    const battle = await starfightersService.getInfosFromAPI(firstUser, secondUser)

    res.status(200).send(battle);
}


async function getRanking(req:Request, res:Response) {
    console.log("get ranking funcionando")

}

const battleController = {
    postBattle,
    getRanking
}

export default battleController