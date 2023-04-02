require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { PORT } = require("./utils/env");
const { auth, task } = require("./routes");
const cors = require("cors");
const { validateAuth } = require("./middleware");
const port = PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    maxAge: 3600,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/user", auth);
app.use("/task", validateAuth, task);
app.listen(port, () => console.log(`Server is running on port ${port}`));
