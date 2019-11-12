var { detect } = require('../');
var test = require('tape');

const ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36';

test('can run detection', function(t) {
  t.ok(detect(ua), 'detection ran ok');
  t.end();
});

test('name detected', function(t) {
  const browser = detect(ua);
  t.ok(browser.name, browser.name);
  t.end();
});

test('version detected', function(t) {
  const browser = detect(ua);
  t.ok(browser.version, browser.version);
  t.end();
});