import { Request,Response } from "express";
import { InterviewService } from "../services/interview.service";

export class InterviewController{
    private interviewService = new InterviewService();

    async create(req:Request,res:Response){
        try{
            const interview = await this.interviewService.create(req.body);
            return res.status(201).json({
                success:true,
                message:"Interview created successfully",
                data:interview
            })
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error instanceof Error ? error.message : "Something went wrong"
            })
        }
    }
}