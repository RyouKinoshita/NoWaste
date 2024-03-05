const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require("./routes/auth");
const product = require("./routes/product");
const order = require("./routes/order");
const article = require("./routes/article");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// app.use(express.json());
app.use("/api/v1", auth);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", article);

module.exports = app;
