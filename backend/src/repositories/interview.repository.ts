import prisma from "../config/prisma";

export class InterviewRepository {
    async create(data:{
        title:string,
        description:string,
        difficulty:"EASY" | "MEDIUM" | "HARD",
        duration:number,
    }){
        return prisma.interview.create({
            data,
        })
    }
}