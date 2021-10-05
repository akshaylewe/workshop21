const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");

mongoose.connect(
  "mongodb+srv://test:akshay@cluster0.vu8sc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});




app.post("/register", (req, res) => {

User.findOne({ username: req.body.username }, async (err, doc) => {
try {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        mobile_no:req.body.phone_no,
        password: hashedPassword,
        confirm_password:hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
    
} catch (err) {
    console.log(err)
    
}  });    

});



app.listen(4000, () => {
  console.log("Server Has Started");
});
