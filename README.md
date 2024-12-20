# level-concat-iterator

**Superseded by [`abstract-level`](https://github.com/Level/abstract-level). Please see [Frequently Asked Questions](https://github.com/Level/community#faq).**

## Usage

```js
const concat = require('level-concat-iterator')
const level = require('level')

const db = level('./db')

db.put('foo', 'bar', function (err) {
  if (err) throw err

  concat(db.iterator(), function (err, entries) {
    if (err) throw err

    // [{ key: 'foo', value: 'bar' }]
    console.log(entries)
  })
})
```

With promises:

```js
await db.put('foo', 'bar')
const entries = await concat(db.iterator())
```

_If you are upgrading: please see [`UPGRADING.md`](UPGRADING.md)._

## API

### `concat(iterator[, callback])`

Takes an `abstract-leveldown` compatible `iterator` as first parameter and calls the `callback` with an array of entries, where each entry is an object in the form `{ key, value }`. Calls the `callback` with an error if `iterator.next()` or `iterator.end()` errors. If no callback is provided, a promise is returned.

## Contributing

[`Level/concat-iterator`](https://github.com/Level/concat-iterator) is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [Contribution Guide](https://github.com/Level/community/blob/master/CONTRIBUTING.md) for more details.

## License

[MIT](LICENSE)
