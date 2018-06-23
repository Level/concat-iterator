var leveldown = require('leveldown')
var concat = require('.')

var db = leveldown('DB')
db.open(function (err) {
  if (err) throw err
  db.put('foo', 'bar', function (err) {
    if (err) throw err
    concat(db.iterator(), function (err, data) {
      if (err) throw err
      console.log(data)
    })
  })
})
