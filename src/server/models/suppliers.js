import mongoose from 'mongoose'

var SupplierSchema = new mongoose.Schema({
  id: String,
  description: String,
})

var Supplier = mongoose.model('Supplier', SupplierSchema)

module.exports = {
  Supplier
}