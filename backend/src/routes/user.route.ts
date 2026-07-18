import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validators/user.validator";
const router = Router();
const userController = new UserController();
router.post("/register",validate(registerSchema),(req,res)=>userController.register(req,res));
router.post("/login",validate(loginSchema), (req, res) => userController.login(req, res));

router.get("/me",authMiddleware,(req,res)=>{
    return res.status(200).json({success:true, message:"User is authenticated",data:req.user});
})

router.get("/profile",authMiddleware,(req,res)=>userController.getProfile(req,res));
export default router;