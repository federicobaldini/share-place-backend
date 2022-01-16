import { v4 as uuidV4 } from "uuid";
import HttpError from "../models/http-error.js";

let PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places && !places.length === 0) {
    next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  } else {
    res.json({ places });
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

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...PLACES.find((p) => p.id === placeId) };
  const placeIndex = PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  PLACES = PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Deleted place." });
};

const _getPlaceById = getPlaceById;
const _getPlacesByUserId = getPlacesByUserId;
const _createPlace = createPlace;
const _updatePlace = updatePlace;
const _deletePlace = deletePlace;

export { _getPlaceById as getPlaceById };
export { _getPlacesByUserId as getPlacesByUserId };
export { _createPlace as createPlace };
export { _updatePlace as updatePlace };
export { _deletePlace as deletePlace };
