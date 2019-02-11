import mongoose from 'mongoose'

//connect to MongoDB
mongoose.connect(process.env.DB_HOST, function(err) {
  if (err) {
    console.error('Failed to connect to mongo on startup', err);
  }
});
const db = mongoose.connection
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log('connected to database')
})

function handleError(err, res){
  var msg = 'Error: ' + err.name + ": " + err.code
  console.log(msg)
  console.log(err)
  res.status(500).send(msg)
}

module.exports = {
  db,
  handleError
}