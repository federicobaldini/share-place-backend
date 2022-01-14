import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes.js";

const webserver = express();

webserver.use("/api/places", placesRoutes);

webserver.listen(5000);
