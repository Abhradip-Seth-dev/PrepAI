import type { Response, Request } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    private userService = new UserService();

    async register(req: Request, res: Response) {
        try {
            const user = await this.userService.register(req.body);
            const { password, ...safeUser } = user;
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: safeUser,
            });
        }catch(error){
            return res.status(400).json({
                success: false,
                message:
                  error instanceof Error ? error.message : "Something went wrong",
              });
        }
    }
    async login(req: Request, res: Response) {
        try {
          const result = await this.userService.login(req.body);
      
          const { password, ...safeUser } = result.user;
      
          return res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            data: safeUser,
          });
        } catch (error) {
          return res.status(401).json({
            success: false,
            message:
              error instanceof Error ? error.message : "Something went wrong",
          });
        }
      }
      async getProfile(req: Request, res: Response) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: "User ID not found in request",
                });
            }

            const user = await this.userService.getProfile(userId);
            const { password, ...safeUser } = user;

            return res.status(200).json({
                success: true,
                message: "User profile retrieved successfully",
                data: safeUser,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                message:
                    error instanceof Error ? error.message : "Something went wrong",
            });
        }
      }
}