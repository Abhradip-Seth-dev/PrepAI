import { Router } from "express";
import prisma from "../config/prisma";
const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PrepAI Backend is running 🚀",
  });
});

router.get("/db-check", async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
        success: true,
        message: "Database is connected 🚀",
    });
})
export default router;