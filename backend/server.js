const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({});

const PORT = process.env.PORT || 3000;

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on http://localhost:${PORT}`);
});
