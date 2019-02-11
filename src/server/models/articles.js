const mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  id: String,
  description: String,
  composition: String,
  quantity: String
}, { _id : false })

var Article = mongoose.model('Article', ArticleSchema);

module.exports = {
  ArticleSchema,
  Article
}