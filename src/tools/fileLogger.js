import config from "../config";
import winston from "winston";
require("winston-daily-rotate-file");

const { logging } = config;

export default type => {
  if (!logging.file) {
    return {
      log: () => { },
    };
  }

  return winston.createLogger({
    transports: [
      new winston.transports.DailyRotateFile({
        dirname: `logs/${type}`,
        filename: "%DATE%.log",
      }),
    ],
  });
};
