var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');
var firebase = require("firebase");
var userfunctions = require('./public/js/userfunctions');
var session = require('client-sessions');

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

//C is for Cookie
app.use(session({
    cookieName: 'session',
    secret: 'hkgviviugiohpoh90y68t7ufuyvkboikvjh',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));

//homepage
app.get('/', function(req, res){
    res.render('index', {
        title: 'Cinco Gatos Homepage',
        user: req.session.user,
        username: req.session.username
    });
});

//login page
app.get('/login', function(req, res){
    res.render('login', {
        title: 'Login to Cinco Gatos'
    });
});

app.post('/login/complete', function(req, res){
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
        userfunctions.login(req.body.email, req.body.password);
        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                var user = firebase.auth().currentUser;
                console.log(user.uid);
                var flash = [];
                await userfunctions.getCards(user.uid).then(function(result){
                        flash = result;
                    });
                let userArray = flash[1];
                let alpha = flash[2];
                let flashcards = flash[0];
                let username = userArray[2];
                req.session.user = user;
                req.session.username = username;
                req.session.nativeL = userArray[0];
                req.session.learningL = userArray[1];
                console.log(req.session.username);
                res.render('flashcards', {
                    title: 'Learn a new language!',
                    user: user,
                    userfunctions: userfunctions,
                    username: username
                })
            } else {
              console.log("Error logging in");
            }
          });
    } 

    
});

//Logout (created a page as cannot load js into EJS)
//https://stackoverflow.com/questions/47001537/how-to-include-external-js-file-to-ejs-node-template-page
app.get('/seeyoulater', function(req, res){
    req.session.reset(); //clear cookie
    userfunctions.logout(); //actually logout
    res.render('logout', {
        title: 'Thanks for visiting!',
        user: null,
        username: null
    });
});

//signup page
app.get('/signup', function(req, res){
    res.render('signup', {
        title: 'Signup for Cinco Gatos'
    });
});

app.post('/signup/complete', function(req, res){
    req.checkBody('email', 'A valid email is required to register').isEmail();
    req.checkBody('password', 'Password is required to register').notEmpty();
    req.checkBody('username', 'Please enter a username').notEmpty();
    req.checkBody('selectNL', 'Select your native language').not().matches("Error");
    req.checkBody('selectLL', 'Please enter the language you would like to learn').not().matches("Error");
    var errors = req.validationErrors();
    
        if(errors){
            res.render('signup', 
            {
                title: 'Register for Cinco Gatos',
                errors: errors
            })
        }
        else{
            var user = userfunctions.auth(req.body.email, req.body.password, req.body.selectNL, req.body.selectLL, req.body.username);
            console.log('User created');
            console.log(user);
            req.session.user = user;
            req.session.username = req.body.username;
            req.session.nativeL = req.body.selectNL;
            req.session.learningL = req.body.selectLL;
            res.render('flashcards', {
                title: 'Learn a new language!',
                user: req.session.user,
                username: req.session.username
            })
        }
});

app.get('/flashcards', function(req, res){
    var currUser = firebase.auth().currentUser;
    res.render('flashcards', {
        title: 'Learn!',
        user: currUser,
        username: req.session.username
    });
});

app.get('/customcards', function(req, res){
    var currUser = firebase.auth().currentUser;
    res.render('uploadcards', {
        title: 'Make custom flashcards',
        user: currUser,
        username: req.session.username
    });
});

app.listen(3000, function(){
    console.log("Server running on port 3000");
})