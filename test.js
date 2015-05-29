var test = require('tape')
var levelup = require('levelup')
var through = require('through2')

var filter = require('./index')

var db = levelup('test', { 
  db: require('memdown'),
  valueEncoding: 'json'
})

test('create filter stream with empty results', function (t) {
  var count = 0
  db.put('wat', { ok: 'cool' }, function (err) {
    var query = filter({ ok: 'great' })
    db.createReadStream()
      .pipe(through.obj(query))
      .on('data', function (data) {
        count++
      })
      .on('end', function () {
        console.log(count)
        t.equals(count, 0)
        t.end()
      })
  })
})

test('create filter stream with one item', function (t) {
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
          t.equals(count, 1)
          t.end()
        })
    })
  })
})