var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');
var firebase = require("firebase");
var userfunctions = require('./public/js/userfunctions');
//var session = require('client-sessions');
var session = require('express-session');
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
    key: 'user',
    secret: 'ebfebfriehnforenvofdlnvplfd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
  }));

  //if cookie in browser but user is not valid
  //log out
  /*
  app.use((req, res, next) => {
    if (req.cookies.user_id && !req.session.user) {
        res.clearCookie('user_id');        
    }
    next();
}); */


//homepage
app.get('/', function(req, res){
    if(req.session.user === undefined){
        var user = null;
    } else {
        var user = req.session.user;
    }
    res.render('index', {
        title: 'Cinco Gatos Homepage',
        user: user,
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
        var username = req.body.username;
        var password = req.body.password;
        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                var user = firebase.auth().currentUser;
                console.log(user.uid);
                var flash = [];
                await userfunctions.getCards(user.uid).then(function(result){
                        flash = result;
                    });
                let userArray = flash[1];
                let username = userArray[2];
                let nativeL = userArray[0];
                let learnL = userArray[1];
                req.session.user = user;
                req.session.native = nativeL;
                req.session.learning = learnL;
                userId = user.uid;
                req.session.userId = userId;
                req.session.username = username;
                res.render('flashcards', {
                    title: 'Learn a new language!',
                    user: req.session.user,
                    userfunctions: userfunctions,
                    userId: userId,
                    username: username,
                    userArray: userArray
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
    req.session.destroy(); //clear cookie
    userfunctions.logout(); //actually logout
    //console.log(req.session.user);
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
            var user = userfunctions
            .auth(req.body.email, req.body.password, req.body.selectNL, req.body.selectLL, req.body.username);
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var user = firebase.auth().currentUser;
                    req.session.user = user;
                    userId = user.uid;
                    req.session.userId = userId;
                    req.session.username = req.body.username;
                    req.session.native = req.body.selectNL;
                    req.session.learning = req.body.selectLL;
                    console.log('User created');
                    res.render('flashcards', {
                        title: 'Learn a new language!',
                        user: req.session.user,
                        username: req.session.username,
                        userId: req.session.userId
                    })
                } else {
                    console.log("Waiting...");
                }
            });
        }
    });

app.get('/profile', function(req, res){
    var currUser = firebase.auth().currentUser;
    if (req.session.user) {
        res.render('profile', {
            title: 'Your Profile',
            user: currUser,
            username: req.session.username,
            userId: req.session.userId,
            native: req.session.native,
            learning: req.session.learning
        });
    } else {
        res.redirect('/login'); //boot them out if they're not logged in
    }
});

app.get('/flashcards', function(req, res){
    var currUser = firebase.auth().currentUser;
    if (req.session.user) {
        //res.sendFile(__dirname + '/flashcards.ejs');
        res.render('flashcards', {
            title: 'Learn!',
            user: currUser,
            username: req.session.username,
            userArray: req.session.userArray,
            username: req.session.username,
            userId: req.session.userId
        });
    } else {
        res.redirect('/login'); //boot them out if they're not logged in
    }

});

app.get('/customcards', function(req, res){
    var currUser = firebase.auth().currentUser;
    if (req.session.user) {
    res.render('uploadcards', {
        title: 'Make custom flashcards',
        user: currUser,
        username: req.session.username,
        userArray: req.session.userArray,
        username: req.session.username,
        userId: req.session.userId
    });   
    } else {
        res.redirect('/login'); //boot them out if they're not logged in
    }
});

app.get('/vocab', function(req, res){
    var currUser = firebase.auth().currentUser;
    if(!req.session.user){
        res.redirect('/login');
    }
    res.render('vocab', {
        title: 'Learn Vocabulary!',
        user: currUser,
        username: req.session.username,
        userArray: req.session.userArray,
        userId: req.session.userId
    });
});

app.listen(3000, function(){
    console.log("Server running on port 3000");
})