import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes.js";

const webserver = express();

webserver.use("/api/places", placesRoutes);

webserver.use((error, req, res, next) => {
  if (res.headerSent) {
    next(error);
  } else {
    res
      .status(error.code || 500)
      .json({ message: error.message || "An unknow error occurred!" });
  }
});

webserver.listen(5000);
