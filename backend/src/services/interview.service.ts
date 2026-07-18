import { InterviewRepository } from "../repositories/interview.repository";

export class InterviewService {
    private interviewRepository = new InterviewRepository();

    async create(data:{
        title:string,
        description:string,
        difficulty:"EASY" | "MEDIUM" | "HARD",
        duration:number,
    }){
        return this.interviewRepository.create(data);
    }
}