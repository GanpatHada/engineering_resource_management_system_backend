require("dotenv").config();
const port = process.env.PORT || 8000;
const app = require("./src/app");
const connectDb = require("./src/configs/db.config");

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 server is running on port : ${port}`);
    });
  })
  .catch((e) => {
    console.log("Mongodb connection failed !!!" + e);
  });