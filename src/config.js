import fs from "fs";
import yaml from "js-yaml";

const config = yaml.load(fs.readFileSync("config.yaml", "utf8"));

const { environment } = config;
const isDebug = () => ["debug"].includes(environment);
const isDev = () => [
  "debug",
  "development",
].includes(environment);
const isProd = () => ["production"].includes(environment);

export default {
  ...config,
  isDebug,
  isDev,
  isProd,
};
