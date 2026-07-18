import {Router} from "express";
import { InterviewController } from "../controllers/interview.controller";
import { validate } from "../middlewares/validation.middleware";
import { createInterviewSchema } from "../validators/interview.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const interviewController = new InterviewController();

router.post("/",authMiddleware,validate(createInterviewSchema),(req,res)=>interviewController.create(req,res));

export default router;