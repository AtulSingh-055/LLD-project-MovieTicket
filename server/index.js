const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
const userRoutes = require("./routes/userRoute");

mongoose
  .connect(
    "mongodb+srv://atulchakrawarty:gLAaQiH7afazN90l@lldcluster0.vbefk8i.mongodb.net/BMS?retryWrites=true&w=majority&appName=LLDCluster0"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });



app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started and is running on port ${PORT}`);
});
