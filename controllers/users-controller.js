import { v4 as uuidV4 } from "uuid";
import HttpError from "../models/http-error.js";

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

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuidV4(),
    name: name,
    email: email,
    password: password,
  };

  USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
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
