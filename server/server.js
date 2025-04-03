const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//database connection with mongoose
mongoose
  .connect(process.nv.MONGO_URI, {
    useNewUrlParser: true,
    useUniiedTopology: true,
  })
  .then(() => console.log("MongoDD connected"))
  .catch((err) => console.log(err));

//importing routes
app.use("/api/auth", require("./routes/auth"));
app.use("api/orders", require("./routes/orders"));

//! server listening
const PORT = process.env.PORT || 5000;
app.lsten(PORT, () => console.log(`Server is running on port' ${PORT}`));
