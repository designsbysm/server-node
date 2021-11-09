import { passportJWT, passportLocal, passportSetup } from "../middleware/passport";
import config from "../config";
import api from "./api";
import express from "express";
import Model from "../models/user";
import path from "path";

const { secret } = config;

passportSetup();
passportJWT({ Model, secret: secret.bcrypt });
passportLocal({ Model, secret: secret.bcrypt });
const router = express.Router();

router.use("/api", api);

// static files
router.use("/", express.static(path.join(__dirname, "..", "..", "client")));
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "index.html"));
});

export default router;
