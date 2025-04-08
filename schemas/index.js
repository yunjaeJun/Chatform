const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
console.log(MONGO_URL);
const connect = () => {
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose
    .connect(MONGO_URL, {
      dbName: "gifchat",
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("몽고디비 연결 성공");
    })
    .catch((err) => {
      console.error("몽고디비 연결 에러", err);
    });
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
