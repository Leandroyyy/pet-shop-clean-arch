import { Router } from "express";
import { registerOwner } from "./register";


const ownerRoutes = Router();

ownerRoutes.use(registerOwner);

export { ownerRoutes };
