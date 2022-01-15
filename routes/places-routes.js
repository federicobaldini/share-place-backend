import { Router } from "express";
const router = Router();

import HttpError from "../models/http-error.js";

const PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = PLACES.find((p) => p.id === placeId);

  if (!place) {
    next(new HttpError("Could not find a place for the provided id.", 404));
  } else {
    res.json({ place });
  }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = PLACES.find((p) => p.creator === userId);

  if (!place) {
    next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  } else {
    res.json({ place });
  }
});

export default router;
