# filter-object-stream

filter a read stream.

## Installation

```
npm install --save filter-object-stream
```

## Example

```
var levelup = require('levelup')
var through = require('through2')
var filter = require('filter-object-stream')

var db = levelup('test', { 
  db: require('memdown'),
  valueEncoding: 'json'
})

var count = 0

db.put('wee', { ok: 'great' }, function (err) {
  db.put('wat', { ok: 'cool' }, function (err) {
    var query = filter({ ok: 'great' })

    db.createReadStream()
      .pipe(through.obj(query))
      .on('data', function (data) {
        count++
      })
      .on('end', function () {
        console.log(count) // -> 1
        t.end()
      })
  })
})
```

## License

MIT