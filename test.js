'use strict'

const test = require('tape')
const collect = require('.')

test('calls back with error if iterator.next errors', function (t) {
  t.plan(3)

  const iterator = {
    next (cb) {
      t.pass('iterator.next called')
      process.nextTick(cb, new Error('iterator.next'))
    },
    end (cb) {
      t.pass('iterator.end called')
      process.nextTick(cb)
    }
  }

  collect(iterator, function (err) {
    t.is(err.message, 'iterator.next', 'correct error')
  })
})

test('happy path calls back with an array', function (t) {
  t.plan(6)

  let i = 0
  const data = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' }
  ]

  const iterator = {
    next (cb) {
      t.pass('iterator.next called')
      if (i < data.length) {
        process.nextTick(cb, null, data[i].key, data[i].value)
        ++i
      } else {
        process.nextTick(cb)
      }
    },
    end (cb) {
      t.pass('iterator.end called')
      process.nextTick(cb)
    }
  }

  collect(iterator, function (err, result) {
    t.error(err, 'no error')
    t.same(result, data)
  })
})

test('calls back with error and data if iterator.end errors', function (t) {
  t.plan(6)

  let i = 0
  const data = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' }
  ]

  const iterator = {
    next (cb) {
      t.pass('iterator.next called')
      if (i < data.length) {
        process.nextTick(cb, null, data[i].key, data[i].value)
        ++i
      } else {
        process.nextTick(cb)
      }
    },
    end (cb) {
      t.pass('iterator.end called')
      process.nextTick(cb, new Error('iterator.end'))
    }
  }

  collect(iterator, function (err, result) {
    t.is(err.message, 'iterator.end', 'correct error')
    t.same(result, data)
  })
})

test('calls back with error and partial data if iterator.end errors', function (t) {
  t.plan(5)

  let i = 0
  const data = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' }
  ]

  const iterator = {
    next (cb) {
      t.pass('iterator.next called')
      if (i === 0) {
        process.nextTick(cb, null, data[i].key, data[i].value)
        i++
      } else {
        process.nextTick(cb)
      }
    },
    end (cb) {
      t.pass('iterator.end called')
      process.nextTick(cb, new Error('foo'))
    }
  }

  collect(iterator, function (err, result) {
    t.is(err.message, 'foo', 'correct error')
    t.same(result, [].concat(data[0]))
  })
})
