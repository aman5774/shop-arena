//=========================================================================================
//importing the required modules
//=========================================================================================
const express     = require("express"),
    app         = express(),
    path        = require("path"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    cors        = require("cors"),
    passport    = require("passport"),
    methodOverride  =require("method-override"),
    config      = require("./config/database")
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//=========================================================================================
// Adding required utilities & middleware
//=========================================================================================
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "public")));
app.use(methodOverride("_method"));
app.use(cors());

//=========================================================================================
// Connecting to the DB
//=========================================================================================
mongoose.connect(config.database);

mongoose.connection.on("connected",() =>{
    console.log("Connected to Database : "+ config.database);
});

mongoose.connection.on("error",(err) =>{
    console.log("Error in Database connection : "+err);
});

//=========================================================================================
// Authentication setup using passport
//=========================================================================================
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

//=========================================================================================
// Requiring Routes
//================================
var usersRoutes = require("./routes/users");

//=========================================================================================
// Using the defined routes
//=========================================================================================
app.use("/users", usersRoutes);

//=========================================================================================
// Starting the server
//=========================================================================================
const PORT = 3000;
app.listen(PORT,"localhost",()=>{
    console.log("Server started on Port " + PORT);
});