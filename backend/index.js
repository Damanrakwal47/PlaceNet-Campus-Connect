const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://place-net-campus-connect.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// public folder for users profile
app.use(
  "/profileImgs",
  express.static(path.join(__dirname, "public/profileImgs"))
);
app.use("/resume", express.static(path.join(__dirname, "public/resumes")));
app.use(
  "/offerLetter",
  express.static(path.join(__dirname, "public/offerLetter"))
);

// database import
const mongodb = require("./config/MongoDB");
mongodb();

// routes for user
app.use("/user", require("./routes/user.route"));
// routes for student user
app.use("/student", require("./routes/student.route"));
// routes for tpo user
app.use("/tpo", require("./routes/tpo.route"));
// routes for management user
app.use("/management", require("./routes/management.route"));
// routes for admin user
app.use("/admin", require("./routes/superuser.route"));

// route for company
app.use("/company", require("./routes/company.route"));

app.use("/regen", require("./routes/regen.route"));

// routes for student user

app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running in http://localhost:${process.env.PORT}`);
});
