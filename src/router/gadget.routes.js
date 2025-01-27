import { Router } from "express";
import {
  addGadget,
  deleteGadget,
  getGadgets,
  selfDestruct,
  updateGadget,
} from "../controller/gadget.controller.js";
const router = Router();

router.route("/gadgets/:id/self-destruct").post(selfDestruct);

router
  .route("/gadgets")
  .get(getGadgets)
  .post(addGadget)
  .patch(updateGadget)
  .delete(deleteGadget);

export default router;
