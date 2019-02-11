const router = require('express').Router();
const { Article } = require('../models/articles')
const { handleError } = require('../db')
const ObjectId = require('mongoose').Types.ObjectId; 

router.get('/',  (req, res) => {
  Article.find().sort({type: 'asc'}).exec((err, result) => {
    if(err){
      handleError(err, res)
    }

    res.send(result)
  })
})

router.get('/:articleCode',  (req, res) => {
  const articleCode = (/^[a-fA-F0-9]{24}$/).test(req.params.articleCode) ? ObjectId(req.params.articleCode) : req.params.articleCode
  
  Article.aggregate()
    .match({$or: [
      { _id: articleCode },
      { codes: { $in: [articleCode, "$codes"] }}
    ]})
    .project({id: "$_id", description: 1, composition: 1, codes: 1})
    .project({_id: 0})
    .exec((err, result) => {
      if(err){
        handleError(err, res)
      }
      res.send(result)
    })
})

router.get('/suggest/:searched',  (req, res) => {
  const searched = req.params.searched
  const searchedRegexp = new RegExp(`.*${searched}.*`, 'i')
  
  Article.aggregate()
    .match({ $or:
      [
        { description: { $regex: searchedRegexp} },
        { codes: { $in: [searchedRegexp, "$codes"]} }
      ]
    })
    .project({id: "$_id", label: "$description"})
    .project({_id: 0})
    .limit(5)
    .exec((err, result) => {
      if(err){
        handleError(err, res)
      }
      res.send(result)
    })
})


module.exports = router