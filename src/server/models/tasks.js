const mongoose = require('mongoose');
const { ArticleSchema } = require('./articles')

var TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
  },
  header: {
    type: Object
  },
  content: Object,
  articles: [ArticleSchema]
});


var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;