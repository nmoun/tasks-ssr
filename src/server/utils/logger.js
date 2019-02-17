module.exports = function(req, res, text){
  if(process.env.NODE_ENV === 'development'){
    console.log(req.originalUrl + ' ' + text)
  }
}