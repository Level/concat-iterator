module.exports = function (iterator, nextTick, cb) {
  if (typeof cb !== 'function') {
    cb = nextTick
    nextTick = process.nextTick
  }
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
      nextTick(next)
    })
  }
  next()
}
