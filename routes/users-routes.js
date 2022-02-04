import { Router } from "express";
import { check } from "express-validator";

import { getUsers, signup, login } from "../controllers/users-controller.js";
import fileUpload from "../middleware/file-upload.js";

const router = Router();

router.get("/", getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  login
);

export default router;
