import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import mongoose from "mongoose";

import placesRoutes from "./routes/places-routes.js";
import usersRoutes from "./routes/users-routes.js";
import HttpError from "./models/http-error.js";

const privateKey = fs.readFileSync("mongodb-key.txt", "utf8");

const webserver = express();

webserver.use(bodyParser.json());

webserver.use((error, req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

webserver.use("/api/places", placesRoutes);
webserver.use("/api/users", usersRoutes);

webserver.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

webserver.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://federico:" +
      privateKey +
      "@cluster0.mswkp.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    webserver.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
