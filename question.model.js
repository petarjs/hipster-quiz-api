var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: String,
  answers: [],
  correctIndex: Number
});

QuestionSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp('^' + name, 'i') }, cb);
};

QuestionSchema.statics.findById = function(id, cb, fields) {
  fields = fields || {};
  return this
    .findOne({ _id: id }, fields)
    .exec(function(err, question) {
      if(!err) {
        cb(question);
      }
    });
};

QuestionSchema.methods.isAnswerCorrect = function(answer, cb) {
  return this.answers.indexOf(answer) === this.correctIndex;
};

var Question = mongoose.model('Question', QuestionSchema);

exports.model = Question;