
import { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middlewares/auth";


const providerRoute = Router();

providerRoute.post("/",auth(UserRole.provider), providerController.createProvider)
providerRoute.get("/", providerController.getAllProvider)


export default providerRoute