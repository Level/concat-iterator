# level-concat-iterator

> Concatenate items from an iterator into an array.

[![level badge][level-badge]](https://github.com/Level/awesome)
[![npm](https://img.shields.io/npm/v/level-concat-iterator.svg?label=&logo=npm)](https://www.npmjs.com/package/level-concat-iterator)
[![Node version](https://img.shields.io/node/v/level-concat-iterator.svg)](https://www.npmjs.com/package/level-concat-iterator)
[![Test](https://github.com/Level/concat-iterator/actions/workflows/test.yml/badge.svg)](https://github.com/Level/concat-iterator/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Level/concat-iterator/branch/master/graph/badge.svg)](https://codecov.io/gh/Level/concat-iterator)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dm/level-concat-iterator.svg?label=dl)](https://www.npmjs.com/package/level-concat-iterator)
[![Backers on Open Collective](https://opencollective.com/level/backers/badge.svg?color=orange)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/level/sponsors/badge.svg?color=orange)](#sponsors)

## Usage

```js
const concat = require('level-concat-iterator')
const level = require('level')

const db = level('./db')

db.put('foo', 'bar', function (err) {
  if (err) throw err

  concat(db.iterator(), function (err, data) {
    if (err) throw err

    console.log(data)
  })
})
```

**If you are upgrading:** please see [`UPGRADING.md`](UPGRADING.md).

## API

### `concat(iterator, cb)`

Takes an `abstract-leveldown` compatible `iterator` as first parameter and calls back with an array of keys and values. Calls back with an error if `iterator.next(cb)` or `iterator.end(cb)` errors.

## Contributing

[`Level/concat-iterator`](https://github.com/Level/concat-iterator) is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [Contribution Guide](https://github.com/Level/community/blob/master/CONTRIBUTING.md) for more details.

## Donate

To sustain [`Level`](https://github.com/Level) and its activities, become a backer or sponsor on [Open Collective](https://opencollective.com/level). Your logo or avatar will be displayed on our 28+ [GitHub repositories](https://github.com/Level) and [npm](https://www.npmjs.com/) packages. 💖

### Backers

[![Open Collective backers](https://opencollective.com/level/backers.svg?width=890)](https://opencollective.com/level)

### Sponsors

[![Open Collective sponsors](https://opencollective.com/level/sponsors.svg?width=890)](https://opencollective.com/level)

## License

[MIT](LICENSE.md) © 2018-present Lars-Magnus Skog and contributors.

[level-badge]: https://leveljs.org/img/badge.svg
