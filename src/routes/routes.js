import { Router } from "express";
import userRoutes from "./userRoutes.js";
import loginRoute from "./loginRoute.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/login", loginRoute);

export { router };