import { v4 as uuidV4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error.js";
import User from "../models/user.js";

let USERS = [
  {
    id: "u1",
    name: "Federico Baldini",
    email: "test@test.com",
    password: "test",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, pleace login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    image:
      "https://images.pexels.com/photos/10430890/pexels-photo-10430890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    password: password,
    places: places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { email, password } = req.body;

  const identifiedUser = USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }
  res.json({ message: "Logged in!" });
};

const _getUsers = getUsers;
const _signup = signup;
const _login = login;

export { _getUsers as getUsers };
export { _signup as signup };
export { _login as login };
