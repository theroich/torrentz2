/**
 * Created by theroich on 7/8/17.
 */
var torrentz = require('../app');
var torremtzOld = require('./app.old');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var fs = require('fs');

let values = torrentz.searchTorrentz2('Harry Potter').then(values => {
  console.log('New', values.length);
});
values = torremtzOld.searchTorrentz2('Harry Potter').then(values => {
  console.log('Old', values.length);
});

const html = fs.readFileSync('./test/resources/raw.html');

suite
  .add('new', function() {
    const values = torrentz.parseHtmlResponse(html);
  })
  .add('old', function() {
    const values = torremtzOld.parseHtmlResponse(html);
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
