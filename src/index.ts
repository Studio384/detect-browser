interface DetectedInfo<N extends string, O, V = null> {
  readonly name: N;
  readonly version: V;
  readonly os: O;
}

export class BrowserInfo
  implements DetectedInfo<Browser, OperatingSystem | null, string> {
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
  ) {}
}

export type Browser =
  | 'edge'
  | 'chrome'
  | 'chrome'
  | 'firefox'
  | 'android'
  | 'safari'
  | 'ios';
export type OperatingSystem =
  | 'iOS'
  | 'Android OS'
  | 'Amazon OS'
  | 'Windows'
  | 'Linux'
  | 'Mac OS'
  | 'Chrome OS';
type UserAgentRule = [Browser, RegExp];
type UserAgentMatch = [Browser, RegExpExecArray] | false;
type OperatingSystemRule = [OperatingSystem, RegExp];

const userAgentRules: UserAgentRule[] = [
  ['edge', /Edg\/([0-9\._]+)/],
  ['edge', /Edge\/([0-9\._]+)/],
  ['edge', /EdgA\/([0-9\._]+)/],
  ['edge', /EdgiOS\/([0-9\._]+)/],
  ['chrome', /CriOS\/([0-9\.]+)(:?\s|$)/],
  ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
  ['firefox', /FxiOS\/([0-9\.]+)/],
  ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ['safari', /Version\/([0-9\._]+).*Safari/],
];
const operatingSystemRules: OperatingSystemRule[] = [
  ['iOS', /iP(hone|od|ad)/],
  ['Android OS', /Android/],
  ['Amazon OS', /Kindle/],
  ['Windows', /Windows/],
  ['Chrome OS', /CrOS/],
  ['Linux', /(Linux)|(X11)/],
  ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
];

export function detect(userAgent?: string): BrowserInfo | null | boolean {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }

  if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return false;
}

export function parseUserAgent(ua: string): BrowserInfo | null {
  // opted for using reduce here rather than Array#first with a regex.test call
  // this is primarily because using the reduce we only perform the regex
  // execution once rather than once for the test and for the exec again below
  // probably something that needs to be benchmarked though
  const matchedRule: UserAgentMatch =
    ua !== '' &&
    userAgentRules.reduce<UserAgentMatch>(
      (matched: UserAgentMatch, [browser, regex]) => {
        if (matched) {
          return matched;
        }

        const uaMatch = regex.exec(ua);
        return !!uaMatch && [browser, uaMatch];
      },
      false,
    );

  if (!matchedRule) {
    return null;
  }

  const [name, match] = matchedRule;
  let versionParts = match[1] && match[1].split(/[._]/).slice(0, 2);
  if (versionParts) {
    if (versionParts.length < 2) {
      versionParts = [
        ...versionParts,
        ...createVersionParts(2 - versionParts.length),
      ];
    }
  } else {
    versionParts = [];
  }

  return new BrowserInfo(name, versionParts.join('.'), detectOS(ua));
}

export function detectOS(ua: string): OperatingSystem | null {
  for (let ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    const [os, regex] = operatingSystemRules[ii];
    const match = regex.test(ua);
    if (match) {
      return os;
    }
  }

  return null;
}

function createVersionParts(count: number): string[] {
  const output = [];
  for (let ii = 0; ii < count; ii++) {
    output.push('0');
  }

  return output;
}
