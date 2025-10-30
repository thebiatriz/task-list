import { Router } from "express";
import auth from "../middlewares/auth.js";
import UserController from "../controllers/UserController.js";

const router = Router();

router.get("/", auth, UserController.getUsers);
router.get("/:id", auth, UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/", auth, UserController.updateUser);
router.delete("/", auth, UserController.deleteUser);


export default router;