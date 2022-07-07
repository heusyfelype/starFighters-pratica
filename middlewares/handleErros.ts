import {NextFunction, Request, Response } from "express";

export async function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    console.log(error)

    // if(error.type === "axios"){
    //     return res.status(409).send("Email já em uso")
    // }

    res.status(500).send("Internal server error")
}