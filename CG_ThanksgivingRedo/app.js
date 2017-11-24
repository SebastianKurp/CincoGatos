var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');
var firebase = require("firebase");

var app = express();

//view engine using EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser middleware per docs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set path for static files
app.use(express.static(path.join(__dirname, '/public')));

//Set up form validation
app.use(validator());


//Global variables
//I think we can put users here
app.use(function(req, res, next){
    res.locals.errors = null;
    res.locals.user = null;
    next();
});

//Initialize Firebase
var config = {
    apiKey: "AIzaSyC2-Xuxno2dcbOA7RGV89yOJ_QYqvNL_uo",
    authDomain: "cincogatos-34db5.firebaseapp.com",
    databaseURL: "https://cincogatos-34db5.firebaseio.com",
    projectId: "cincogatos-34db5",
    storageBucket: "cincogatos-34db5.appspot.com",
    messagingSenderId: "821202238986"
  };
  firebase.initializeApp(config);
  const ref = firebase.database().ref();
  const fbAuth = firebase.auth;

//Firebase functions
function auth (email, pw, nL,lL, useName) {
    native = nL;
    learning = lL;
    name = useName;
    return fbAuth().createUserWithEmailAndPassword(email, pw)
      .then(saveUser);
  }

function login (email, pw) {
    return fbAuth().signInWithEmailAndPassword(email, pw)
  }

//homepage
app.get('/', function(req, res){
    var currUser = firebase.auth().currentUser;
    res.render('index', {
        title: 'Cinco Gatos Homepage',
        user: currUser
    });
});

//login page
app.get('/login', function(req, res){
    res.render('login', {
        title: 'Login to Cinco Gatos'
    });
});

app.post('/login/complete', function(req, res){
    console.log(req.body.email);
    req.checkBody('email', 'Email is required to login').isEmail();
    req.checkBody('password', 'Password is required to login').notEmpty();
    
    var errors = req.validationErrors();

    if(errors){
        res.render('login', 
        {
            title: 'Login to Cinco Gatos',
            errors: errors
        })
    }
    else{
        var userJson = {
            email: req.body.email,
            password: req.body.password
        }
        var user = login(req.body.email, req.body.password);
        console.log('User created');
        console.log(user);
        res.render('flashcards', {
            title: 'Learn a new language!',
            user: user
        })
    } 

    
});


//signup page
app.get('/signup', function(req, res){
    res.render('signup', {
        title: 'Signup for Cinco Gatos'
    });
});

app.post('/signup/complete', function(req, res){
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        nativeLang: req.body.selectNL,
        learnLang: req.body.selectLL
    }
    console.log(newUser);
});

app.get('/flashcards', function(req, res){
    var currUser = firebase.auth().currentUser;
    res.render('flashcards', {
        title: 'Learn!',
        user: currUser
    });
});

app.get('/customcards', function(req, res){
    var currUser = firebase.auth().currentUser;
    res.render('uploadcards', {
        title: 'Make custom flashcards',
        user: currUser
    });
});

app.listen(3000, function(){
    console.log("Server running on port 3000");
})