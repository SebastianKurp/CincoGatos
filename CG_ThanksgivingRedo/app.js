var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');

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
    next();
});

//homepage
app.get('/', function(req, res){
    res.render('index', {
        title: 'Cinco Gatos Homepage'
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
    req.checkBody('email', 'Email is required to login').notEmpty();
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
        var user = {
            email: req.body.email,
            password: req.body.password
        }
        console.log('User created');
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
    res.render('flashcards', {
        title: 'Learn!'
    });
});

app.get('/customcards', function(req, res){
    res.render('uploadcards', {
        title: 'Make custom flashcards'
    });
});

app.listen(3000, function(){
    console.log("Server running on port 3000");
})