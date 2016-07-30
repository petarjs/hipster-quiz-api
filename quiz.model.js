var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
  name: String,
  questions: [{ type: mongoose.Schema.ObjectId, ref: 'Question'}]
});

QuizSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp('^' + name, 'i') }, cb);
};

QuizSchema.statics.findById = function(id, cb) {
  return this
    .findOne({ _id: id })
    .populate('questions')
    .exec(function(err, quiz) {
      if(!err) {
        cb(quiz);
      }
    });
};

var Quiz = mongoose.model('Quiz', QuizSchema);

exports.model = Quiz;