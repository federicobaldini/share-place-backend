import { v4 as uuidV4 } from "uuid";
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    next(new HttpError("Could not find a place for the provided id.", 404));
  } else {
    res.json({ place });
  }
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  } else {
    res.json({ place });
  }
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidV4(),
    title: title,
    description: description,
    location: coordinates,
    address: address,
    creator: creator,
  };

  PLACES.push(createdPlace);

  res.status(201).json(createdPlace);
};

const _getPlaceById = getPlaceById;
const _getPlaceByUserId = getPlaceByUserId;
const _createPlace = createPlace;

export { _getPlaceById as getPlaceById };
export { _getPlaceByUserId as getPlaceByUserId };
export { _createPlace as createPlace };
