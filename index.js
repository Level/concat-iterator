module.exports = function (iterator, cb) {
  var data = []
  var next = function () {
    iterator.next(function (err, key, value) {
      if (err) return cb(err)
      if (!arguments.length) {
        return iterator.end(function (err) {
          cb(err, data)
        })
      }
      data.push({ key: key, value: value })
      next()
    })
  }
  next()
}
