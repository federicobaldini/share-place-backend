import { Router } from "express";
const router = Router();

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
    const error = new Error("Could not find a place for the provided id.");
    error.code = 404;
    next(error);
  } else {
    res.json({ place });
  }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = PLACES.find((p) => p.creator === userId);

  if (!place) {
    const error = new Error("Could not find a place for the provided user id.");
    error.code = 404;
    next(error);
  } else {
    res.json({ place });
  }
});

export default router;
