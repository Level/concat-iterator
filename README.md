# level-concat-iterator

> Concatenate items from an iterator into an array.

[![level badge][level-badge]](https://github.com/level/awesome)
[![npm](https://img.shields.io/npm/v/level-concat-iterator.svg)](https://www.npmjs.com/package/level-concat-iterator)
![Node version](https://img.shields.io/node/v/level-concat-iterator.svg)
[![Travis](https://img.shields.io/travis/Level/concat-iterator.svg)](http://travis-ci.org/Level/concat-iterator)
[![dependencies](https://david-dm.org/Level/level-concat-iterator.svg)](https://david-dm.org/level/level-concat-iterator)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dm/level-concat-iterator.svg)](https://www.npmjs.com/package/level-concat-iterator)

## Usage

```js
var concat = require('level-concat-iterator')
var level = require('level')

level('DB', function (err, db) {
  db.put('foo', 'bar', function (err) {
    concat(db.iterator(), function (err, data) {
      console.log(data)
    })
  })
})
```

**If you are upgrading:** please see [`UPGRADING.md`](UPGRADING.md).

## API

### `concat(iterator, cb)`

Takes an `abstract-leveldown` compatible `iterator` as first parameter and calls back with an array of keys and values. Calls back with an error if `iterator.next(cb)` or `iterator.end(cb)` errors.

## Contributing

`level-concat-iterator` is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [`contribution guide`](https://github.com/Level/community/blob/master/CONTRIBUTING.md) file for more details.

## License

[MIT](./LICENSE.md) © 2018-present `level-concat-iterator` [Contributors](./CONTRIBUTORS.md).

[level-badge]: http://leveldb.org/img/badge.svg
