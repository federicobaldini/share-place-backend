import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes.js";
import usersRoutes from "./routes/users-routes.js";
import HttpError from "./models/http-error.js";

const webserver = express();

webserver.use(bodyParser.json());

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

webserver.listen(5000);
