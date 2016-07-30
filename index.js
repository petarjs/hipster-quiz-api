var express = require('express');
var mongoose = require('mongoose');
var helmet = require('helmet')
var bodyParser = require('body-parser');
var RateLimit = require('express-rate-limit');

var Quiz = require('./quiz.model').model;
var Question = require('./question.model').model;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/quiz');

var app = express();

app.use(bodyParser.json());
app.use(helmet({
  hsts: false
}));

var limiter = new RateLimit({
  windowMs: 15*60*1000,
  max: 1000,
  delayMs: 0
});
 
app.use(limiter);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/quizzes/search/:q', function(req, res) {
  Quiz.findByName(req.params.q, function(err, quizzes) {
    res.status(200).json(quizzes);
  });
});

app.get('/quizzes/:id', function(req, res) {
  Quiz.findById(req.params.id, function(quiz) {
    res.status(200).json(quiz);
  });
});

app.post('/questions/:id/answer', function(req, res) {
  var questionId = req.params.id;
  var answer = req.body.answer;

  Question.findById(questionId, function(question) {
    if(question) {
      var correct = question.isAnswerCorrect(answer);
      res.status(200).json({
        correct: correct
      });
    } else {
      res.status(400).json({
        error: 'Bad data'
      });
    }
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});