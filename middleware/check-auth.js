import jwt from "jsonwebtoken";
import fs from "fs";

import HttpError from "../models/http-error.js";

const privateKey = fs.readFileSync("private-key.txt", "utf8");

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization "Bearer TOKEN"
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, privateKey);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
