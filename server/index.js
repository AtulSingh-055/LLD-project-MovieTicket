const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

mongoose
  .connect("mongodb+srv://atulchakrawarty:gLAaQiH7afazN90l@lldcluster0.vbefk8i.mongodb.net/BMS?retryWrites=true&w=majority&appName=LLDCluster0")
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
    console.log(`Server started and is running on port ${PORT}`);
});