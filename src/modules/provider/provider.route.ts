import { Router } from "express";
import { providerController } from "./provider.controller";


const providerRoute = Router();

providerRoute.post("/", providerController.createProvider)
providerRoute.get("/", providerController.getAllProvider)


export default providerRoute