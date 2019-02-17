import { Supplier } from '../models/suppliers'
import express from 'express'
import { handleError } from '../db'

const router = express.Router()

router.get('/:supplier',  (req, res) => {  
  Supplier.aggregate()
    .match({ id: req.params.supplier })
    .project({ id: 1, description: 1 })
    .project({ _id: 0 })
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
  
  Supplier.aggregate()
    .match({ $or:
      [
        { description: searchedRegexp },
        { id: searchedRegexp }
      ]
    })
    .project({ id: 1, label: '$description' })
    .project({ _id: 0 })
    .limit(5)
    .exec((err, result) => {
      if(err){
        handleError(err, res)
      }
      res.send(result)
    })
})

module.exports = router