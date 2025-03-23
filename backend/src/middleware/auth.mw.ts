import { Request, Response, NextFunction } from "express";

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.isLogin){
        next()
        return
    }
    res.status(403).json({message:`You are not login !`})
}