import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes.js";

const webserver = express();

webserver.use(bodyParser.json());

webserver.use("/api/places", placesRoutes);

webserver.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

webserver.listen(5000);
