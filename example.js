const level = require('level')
const concat = require('.')

const db = level('./db')

db.put('foo', 'bar', function (err) {
  if (err) throw err

  concat(db.iterator(), function (err, entries) {
    if (err) throw err

    console.log(entries)
  })
})
