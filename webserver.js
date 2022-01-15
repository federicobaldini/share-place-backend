import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes.js";

const webserver = express();

webserver.use("/api/places", placesRoutes); // => /api/places...

webserver.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

webserver.listen(5000);
