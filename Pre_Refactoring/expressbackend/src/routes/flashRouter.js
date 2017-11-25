var express = require('express');
var app = express();
var flashRouter = express.Router();

// Require flashcard model in our routes module
var flashcard = require('../models/Flashcard');

// Defined store route
flashRouter.route('/add/post').post(function (req, res) {
  var flashcard = new Flashcard(req.body);
      flashcard.save()
    .then(flashcard => {
    res.json('Flashcard added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
flashRouter.route('/').get(function (req, res) {
  flashcard.find(function (err, cards){
    if(err){
      console.log(err);
    }
    else {
      res.json(cards);
    }
  });
});

//  Defined update route
flashRouter.route('/update/:id').post(function (req, res) {
  Flashcard.findById(req.params.id, function(err, flashcard) {
    if (!flashcard)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      flashcard.flashcard = req.body.flashcard;

      flashcard.save().then(flashcard => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete route
flashRouter.route('/delete/:id').get(function (req, res) {
  Flashcard.findByIdAndRemove({_id: req.params.id},
       function(err, flashcard){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = flashRouter;
