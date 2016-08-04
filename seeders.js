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

catQuiz
  .save()
  .then(function(quiz) {
    console.log('Saved cat quiz');

    var q1 = new Question({
      question: 'How many cats does it take to change a light bulb?',
      answers: ['1', '2', '3', '4'],
      correctIndex: 1
    });

    var q2 = new Question({
      question: 'Do cats and dogs like each other?',
      answers: ['Yes', 'No', 'Sometimes', 'They are sworn enemies'],
      correctIndex: 2
    });

    var q3 = new Question({
      question: 'What is it called when a cat enjoyes and produces a certain sound?',
      answers: ['Mewoving', 'Caughing', 'Hissing', 'Purring'],
      correctIndex: 3
    });

    q1
      .save()
      .then(function(q) {
        console.log('saved q1');
        catQuiz.questions.push(q1);
      });
    q2
      .save()
      .then(function(q) {
        console.log('saved q2');
        catQuiz.questions.push(q2);
      });
    q3
      .save()
      .then(function(q) {
        console.log('saved q3');
        catQuiz.questions.push(q3);
      });
  });

  

coffeeQuiz
  .save()
  .then(function(quiz) {
    console.log('Saved coffee quiz');
    var q1 = new Question({
      question: 'Which continent is the birthplace of Coffee?',
      answers: ['America', 'Europe', 'Africa', 'Asia'],
      correctIndex: 2
    });

    q1
      .save()
      .then(function(q) {
        console.log('saved q1');
        coffeeQuiz.questions.push(q1);
      });
    var q2 = new Question({
      question: 'Which of these coffees usually has the lowest acidity?',
      answers: ['Ethiopia', 'Bolivia', 'India', 'Yemen'],
      correctIndex: 2
    });

    q2
      .save()
      .then(function(q) {
        console.log('saved q2');
        coffeeQuiz.questions.push(q2);
      });
    var q3 = new Question({
      question: 'Which of these is NOT a tool for preparing filter coffee?',
      answers: ['Aeropress', 'Cezve', 'Kalita', 'Hario V50'],
      correctIndex: 1
    });

    q3
      .save()
      .then(function(q) {
        console.log('saved q3');
        coffeeQuiz.questions.push(q2);
      });
  });

  setTimeout(function() {
    catQuiz.save()
    coffeeQuiz.save();
  }, 500);