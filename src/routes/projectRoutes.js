import { Router } from "express";
import auth from "../middlewares/auth.js";
import ProjectController from "../controllers/ProjectController.js";
import TaskController from "../controllers/TaskController.js";

const router = Router();

router.post("/", auth, ProjectController.createProject);
router.get("/", auth, ProjectController.getProjects);
router.get("/:id", auth, ProjectController.getProjectById);
router.put("/:id", auth, ProjectController.updateProject);
router.delete("/:id", auth, ProjectController.deleteProject);
router.post("/:projectId/tasks", auth, TaskController.createTask);
router.get("/:projectId/tasks", auth, TaskController.getTasks);

export default router;