import { Router } from "express";
import { registerPet } from "./register";

const petRoutes = Router();

petRoutes.use(registerPet);

export { petRoutes };
