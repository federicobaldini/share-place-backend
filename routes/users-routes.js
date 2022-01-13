import { Router } from "express";
const router = Router();

router.get("/", (req, res, next) => {
  console.log("GET request in users");
  res.json({ message: "It works!" });
});

export default router;
