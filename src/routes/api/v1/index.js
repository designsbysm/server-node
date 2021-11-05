import express from "express";
import crud from "./crud/router";
import mock from "./mock";
import options from "./options/router";
import session from "./session/router";
import server from "./server/router";
import users from "./users/router";

const router = express.Router();

router.use("/mock", mock);
router.use("/options", options);
router.use("/session", session);
router.use("/server", server);
router.use("/users", users);
router.use("/:kind", crud);

export default router;
