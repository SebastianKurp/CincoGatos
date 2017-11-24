var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');
var firebase = require("firebase");
var userfunctions = require('./public/js/userfunctions');

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
        var user = userfunctions.login(req.body.email, req.body.password);
        console.log('User created');
        console.log(user);
        res.render('flashcards', {
            title: 'Learn a new language!',
            user: user
        })
    } 

    
});

//Logout (created a page as cannot load js into EJS)
//https://stackoverflow.com/questions/47001537/how-to-include-external-js-file-to-ejs-node-template-page
app.get('/seeyoulater', function(req, res){
    userfunctions.logout();
    res.render('logout', {
        title: 'Thanks for visiting!',
        user: null
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
            var newUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                nativeLang: req.body.selectNL,
                learnLang: req.body.selectLL
            }
            //(email, pw, nL,lL, useName) 
            var user = userfunctions.auth(req.body.email, req.body.password, req.body.selectNL, req.body.selectLL, req.body.username);
            console.log('User created');
            console.log(user);
            res.render('flashcards', {
                title: 'Learn a new language!',
                user: user
            })
        }
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