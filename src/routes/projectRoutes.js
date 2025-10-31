import { Router } from "express";
import auth from "../middlewares/auth.js";
import ProjectController from "../controllers/ProjectController.js";

const router = Router();

router.get("/", auth, ProjectController.getProjects);
router.get("/:id", auth, ProjectController.getProjectById);
router.post("/", auth, ProjectController.createProject);
router.put("/:id", auth, ProjectController.updateProject);
router.delete("/:id", auth, ProjectController.deleteProject);

export default router;