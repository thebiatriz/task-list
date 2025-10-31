import { Router } from "express";
import userRoutes from "./userRoutes.js";
import loginRoute from "./loginRoute.js";
import projectRoutes from "./projectRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/login", loginRoute);
router.use("/projects", projectRoutes);

export { router };