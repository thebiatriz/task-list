import { Router } from "express";
import auth from "../middlewares/auth.js";
import TaskController from "../controllers/TaskController.js";

const router = Router();

router.get("/:id", auth, TaskController.getTaskById);
router.put("/:id", auth, TaskController.updateTask);
router.delete("/:id", auth, TaskController.deleteTask);

export default router;