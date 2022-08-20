const Application = require("./framework/Application");
const UserRouter = require("./src/user-router");
const jsonParser = require("./framework/middleware/parseJson");
const urlParser = require("./framework/middleware/parseUrl");
const bodyParser = require("./framework/middleware/parseBody");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = new Application();

app.use(jsonParser);
app.use(bodyParser);
app.use(urlParser("http://localhost:5000"));
app.addRouter(UserRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT | 5000, () => console.log("Server started"));
  } catch (e) {
    console.log(e);
  }
};

start();
