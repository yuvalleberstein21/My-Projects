const express = require("express");
const cors = require("cors");

const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/UserRoutes');
const vacationRoutes = require('./routes/VacationsRoutes');
const followersRoutes = require('./routes/FollowersRoutes');
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));



app.use('/public', express.static('public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "vacations",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))



app.use("/api", authRoutes);
app.use("/api", vacationRoutes);
app.use("/api", followersRoutes);



app.use((req, res) => {
    res.send('<h1>Page not found</h1>')
})


app.listen(5000, () => {
    console.log("running backend server on port 5000");
})

