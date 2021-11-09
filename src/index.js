// import "./install";
import config from "./config";
import apiLogger from "./middleware/apiLogger";
import errors from "./middleware/errorHandler";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import http from "http";
import https from "https";
import memoryStore from "memorystore";
import passport from "passport";
import path from "path";
import routes from "./routes";
import session from "express-session";

const { api, environment, secret, ssl } = config;
const app = express();
const MemoryStore = memoryStore(session);

app.use(helmet());
app.use(apiLogger);
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: secret.session,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errors);

const options = {};
let server;

if (api.protocol === "HTTPS") {
  options.cert = fs.readFileSync(path.join(__dirname, ssl.cert));
  options.key = fs.readFileSync(path.join(__dirname, ssl.key));
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}

server.listen(api.port, () => console.info(`API: ${environment} ${api.protocol} on ${api.port}`));
