require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
app.use(cors());
const userRoutes = require("./routes/userRoute");
const theatreRoutes = require("./routes/theatreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoute");

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
app.use("/api/theatres", theatreRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

// Serve static files from React app
const path = require("path");
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started and is running on port ${PORT}`);
});
