import config from "./config";
import bluebird from "bluebird";
import mongoose from "mongoose";

const { db } = config;

mongoose.Promise = bluebird.Promise;
mongoose.connect(db.connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
