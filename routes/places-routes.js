import { Router } from "express";
import { check } from "express-validator";

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/places-controller.js";

const router = Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 8 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);

export default router;
