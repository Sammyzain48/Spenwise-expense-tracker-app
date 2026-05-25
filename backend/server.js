require("dotenv").config({
  path: "../backend/expense-tracker-backend/.env",
});
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./expense-tracker-backend/db/connectToDB");
const authRoute = require("../backend/expense-tracker-backend/routes/auth-routes");
const dashboardRoute = require("./expense-tracker-backend/routes/dashboard-routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/home", dashboardRoute);

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT} `);
});
