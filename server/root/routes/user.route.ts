import express from "express";
import { createUser, loginUser } from "../controllers/user.controller";
import { forgotPassword, resetPassword, verifyEmail, verifyToken } from "../controllers/auth.controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(" get user ");
});
router.get( "/verify-email", verifyEmail );

router.post("/", createUser );
router.post( "/login", loginUser );
router.post( "/verify-token", verifyToken )
router.post("/forgot-password", forgotPassword);
router.post( "/reset-password", resetPassword );

export default router;