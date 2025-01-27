import { Router } from "express";
import { getGadgets } from "../controller/gadget.controller.js";
const router = Router();

router.route("/gadgets").get(getGadgets);

export default router;
