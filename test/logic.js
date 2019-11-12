var test = require('tape');
var { parseUserAgent } = require('../');

function assertAgentString(t, agentString, expectedResult) {
  t.deepEqual(parseUserAgent(agentString), expectedResult);
}

test('detects Chrome', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
    { name: 'chrome', version: '50.0', os: 'Linux' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    { name: 'chrome', version: '41.0', os: 'Windows' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
    { name: 'chrome', version: '72.0', os: 'Windows' },
  );

  t.end();
});

test('detects Chrome for iOS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3',
    { name: 'chrome', version: '19.0', os: 'iOS' },
  );

  t.end();
});

test('detects Firefox', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
    { name: 'firefox', version: '46.0', os: 'Linux' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1',
    { name: 'firefox', version: '40.1', os: 'Windows' },
  );

  t.end();
});

test('detects Firefox for iOS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4',
    { name: 'firefox', version: '1.0', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/3.2 Mobile/12F69 Safari/600.1.4',
    { name: 'firefox', version: '3.2', os: 'iOS' },
  );

  t.end();
});

test('detects Edge', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240',
    { name: 'edge', version: '12.10240', os: 'Windows' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0 (Touch; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; HPNTDFJS; H9P; InfoPath',
    { name: 'edge', version: '12.0', os: 'Windows' },
  );

  t.end();
});

test('detects mobile Safari', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
    { name: 'ios', version: '6.0', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
    { name: 'ios', version: '5.0', os: 'iOS' },
  );

  t.end();
});

test('detects Safari', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
    { name: 'safari', version: '7.0', os: 'Mac OS' },
  );

  t.end();
});

test('detects Chrome OS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (X11; CrOS x86_64 10895.78.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.120 Safari/537.36',
    { name: 'chrome', version: '69.0', os: 'Chrome OS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (X11; U; CrOS i686 9.10.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Gecko/20100101 Firefox/29.0',
    { name: 'firefox', version: '29.0', os: 'Chrome OS' },
  );
  t.end();
});

test('detects edge chromium', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.48 Safari/537.36 Edg/74.1.96.24',
    { name: 'edge', version: '74.1', os: 'Windows' },
  );
  t.end();
});

test('detects edge iOS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 EdgiOS/44.2.1 Mobile/16D57 Safari/605.1.15',
    { name: 'edge', version: '44.2', os: 'iOS' },
  );
  t.end();
});

test('handles no browser', function(t) {
  assertAgentString(t, null, null);

  t.end();
});