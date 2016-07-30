var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/quiz');

var Quiz = require('./quiz.model').model;
var Question = require('./question.model').model;

var coffeeQuiz = new Quiz({
  name: 'Coffee',
  author: 'Petar',
  description: 'Quiz about Coffee',
  timesPlayed: 0,
  questions: []
});

var catQuiz = new Quiz({
  name: 'Cat',
  author: 'Petar',
  description: 'Quiz about Cats',
  timesPlayed: 0,
  questions: []
});

coffeeQuiz
  .save()
  .then(function(quiz) {
    console.log('Saved coffee quiz');
    var q1 = new Question({
      question: 'Which continenet is the birthplace of Coffee?',
      answers: ['America', 'Europe', 'Africa', 'Asia'],
      correctIndex: 2
    });

    q1
      .save()
      .then(function(q) {
        console.log('saved q1');
        coffeeQuiz.questions.push(q1);

        coffeeQuiz
          .save()
          .then(function() {
            console.log('Saved first question');
          });
      });
  });

