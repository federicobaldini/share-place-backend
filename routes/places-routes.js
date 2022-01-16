import { Router } from "express";

import {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace
} from "../controllers/places-controller.js";

const router = Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);

export default router;
