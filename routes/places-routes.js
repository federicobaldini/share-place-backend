import { Router } from "express";
const router = Router();

router.get("/", (req, res, next) => {
  console.log("GET request in places");
  res.json({ message: "It works!" });
});

export default router;
