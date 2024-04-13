const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to db successfully"))
    .catch(err => console.log(err))

const app = express();
const homepage = require("./routes/home");

const testemailRoute = require("./routes/test_email");
const testsmsRoute = require("./routes/test_sms");
const userRoute = require("./routes/user");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const authRoute = require("./routes/auth");
const how_it_worksRoute = require("./routes/how_it_works");
const mail_usRoute = require("./routes/mail_us");
const dashboardRoute = require("./routes/dashboard");

app.set("view engine", "pug");
app.set('views', path.join(__dirname, '/views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/", homepage);
app.use("/test_email", testemailRoute);
app.use("/test_sms", testsmsRoute);
app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/mail_us", mail_usRoute);
app.use("/how_it_works", how_it_worksRoute);
app.use("/dashboard", dashboardRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening to server on ${PORT}`);
})