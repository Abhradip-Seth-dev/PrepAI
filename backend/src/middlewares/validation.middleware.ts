import {z} from 'zod';
import {NextFunction, Request, Response} from 'express';

export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success){
        
        return res.status(400).json({success:false, message:"Validation failed", errors:result.error.issues})
        req.body = result.data;
        next();
    }
}