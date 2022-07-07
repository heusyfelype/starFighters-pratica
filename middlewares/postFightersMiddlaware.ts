import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function postFightersMiddlaware(req: Request, res: Response, next: NextFunction) {

    const infosToValidate = req.body

    const infosSchema = Joi.object({
        firstUser: Joi.string().required(),
        secondUser: Joi.string().required()
    });

    const isValidInfos = infosSchema.validate(infosToValidate, { abortEarly: false })

    if(isValidInfos.error){
        throw {type: "Unprocessable Entity", message: "Dados inseridos de forma incorreta!"}
    }

    next()

}