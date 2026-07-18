import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({success:false, message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false, message: "Token missing" });

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string,email:string, role:import("@prisma/client").UserRole };
        req.user=decoded
        next();
    }catch(error){
        console.error(error);
         return res.status(401).json({success:false, message: "Unauthorized" });
    }
}
