var test = require('tape')
var collect = require('.')

test('calls back with error if iterator.next errors', function (t) {
  t.plan(1)

  var iterator = {
    next: function (cb) {
      process.nextTick(cb, new Error('dude'))
    }
  }

  collect(iterator, function (err) {
    t.is(err.message, 'dude', 'correct error')
  })
})

test('happy path calls back with an array', function (t) {
  t.plan(2)

  var i = 0
  var data = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' }
  ]

  var iterator = {
    next: function (cb) {
      if (i < data.length) {
        process.nextTick(cb, null, data[i].key, data[i].value)
        ++i
      } else {
        process.nextTick(cb)
      }
    },
    end: function (cb) {
      process.nextTick(cb)
    }
  }

  collect(iterator, function (err, result) {
    t.error(err, 'no error')
    t.same(result, data)
  })
})

test('calls back with error and data if iterator.end errors', function (t) {
  t.plan(2)

  var i = 0
  var data = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' }
  ]

  var iterator = {
    next: function (cb) {
      if (i < data.length) {
        process.nextTick(cb, null, data[i].key, data[i].value)
        ++i
      } else {
        process.nextTick(cb)
      }
    },
    end: function (cb) {
      process.nextTick(cb, new Error('foo'))
    }
  }

  collect(iterator, function (err, result) {
    t.is(err.message, 'foo', 'correct error')
    t.same(result, data)
  })
})

test('calls back with error and partial data if iterator.end errors', function (t) {
  t.plan(2)

  var i = 0
  var data = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' }
  ]

  var iterator = {
    next: function (cb) {
      if (i === 0) {
        process.nextTick(cb, null, data[i].key, data[i].value)
        i++
      } else {
        process.nextTick(cb)
      }
    },
    end: function (cb) {
      process.nextTick(cb, new Error('foo'))
    }
  }

  collect(iterator, function (err, result) {
    t.is(err.message, 'foo', 'correct error')
    t.same(result, [].concat(data[0]))
  })
})

test('supports custom nextTick', function (t) {
  t.plan(2)

  var iterator = {
    next: function (cb) {
      process.nextTick(cb, null, 'key', 'value')
    }
  }

  function nextTick (next) {
    t.is(typeof next, 'function', 'next is a function')
    t.pass('custom nextTick called')
  }

  collect(iterator, nextTick, function () {})
})
