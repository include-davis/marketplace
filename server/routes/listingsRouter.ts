import { Router, type Request, type Response } from "express";
import {
    getAllListingsController,
    getListingController,
    createListingController,
    updateListingController,
    deleteListingController,
} from "../controllers/listingsController.ts";

const listingsRouter = Router();

listingsRouter.get("/", (req: Request, res: Response) => getAllListingsController(req, res));
listingsRouter.get("/:id", (req: Request, res: Response) => getListingController(req, res));
listingsRouter.post("/", (req: Request, res: Response) => createListingController(req, res));
listingsRouter.put("/:id", (req: Request, res: Response) => updateListingController(req, res));
listingsRouter.delete("/:id", (req: Request, res: Response) => deleteListingController(req, res));

export default listingsRouter;
