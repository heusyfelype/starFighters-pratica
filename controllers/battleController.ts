import { Request, Response } from "express";


async function postBattle(req:Request, res:Response) {
    const {firstUser, secondUser} = req.body

    console.log("post battle funcionando")
}


async function getRanking(req:Request, res:Response) {
    console.log("get ranking funcionando")

}

const battleController = {
    postBattle,
    getRanking
}

export default battleController