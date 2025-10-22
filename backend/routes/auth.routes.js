import express from "express";
const router = express.Router();
import { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner } from "../controllers/auth.controller.js";

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);


router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.get("/food-partner/logout", logoutFoodPartner);

export default router;