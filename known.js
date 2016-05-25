const licenses = [
  {
    name: "Apache 2.0",
    url: "http://www.apache.org/licenses/LICENSE-2.0",
    tldr: "https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)",
    alt_urls: [
      "http://www.apache.org/licenses/LICENSE-2.0.txt",
      "http://www.apache.org/licenses/LICENSE-2.0.html"
    ],
    alt_names: [
      "Apache License Version 2.0"
    ]
  },
  {
    name: "BouncyCastle (MIT)",
    url: "https://www.bouncycastle.org/licence.html",
    alt_urls: [
      "http://www.bouncycastle.org/licence.html"
    ]
  },
  {
    name: "BSD 2-Clause",
    url: "https://opensource.org/licenses/bsd-license",
    tldr: "https://tldrlegal.com/license/bsd-2-clause-license-(freebsd)",
    alt_urls: [
      "http://www.opensource.org/licenses/bsd-license.php",
      "http://www.opensource.org/licenses/bsd-license.html"
    ]
  },
  {
    name: "BSD 3-Clause",
    url: "https://opensource.org/licenses/BSD-3-Clause",
    tldr: "https://tldrlegal.com/license/bsd-3-clause-license-(revised)",
    alt_urls: [
      "http://www.antlr.org/license.html",
      "http://antlr.org/license.html"
    ]
  },
  {
    name: "GPL 2.0",
    url: "http://www.gnu.org/licenses/old-licenses/gpl-2.0",
    tldr: "https://tldrlegal.com/license/gnu-general-public-license-v2"
  },
  {
    name: "LGPL 2.1",
    url: "http://www.gnu.org/licenses/lgpl-2.1.html",
    tldr: "https://tldrlegal.com/license/gnu-lesser-general-public-license-v2.1-(lgpl-2.1)",
    alt_urls: [
      "http://www.fsf.org/licensing/licenses/lgpl.txt"
    ],
    alt_names: [
      "LGPL-2.1"
    ]
  },
  {
    name: "LGPL 3.0",
    url: "http://www.gnu.org/licenses/lgpl.html",
    tldr: "https://tldrlegal.com/license/gnu-lesser-general-public-license-v3-(lgpl-3)"
  },
  {
    name: "MIT",
    url: "http://www.opensource.org/licenses/mit-license.php",
    tldr: "https://tldrlegal.com/license/mit-license"
  },
  {
    name: "CDDL 1.0",
    url: "https://opensource.org/licenses/cddl1.php",
    tldr: "https://tldrlegal.com/license/common-development-and-distribution-license-(cddl-1.0)-explained",
    alt_urls: [
      "http://www.opensource.org/licenses/cddl1.php",
      "https://glassfish.dev.java.net/public/CDDLv1.0.html"
    ]
  },
  {
    name: "CDDL 1.0 + GPL2.0 ClassPath Exception",
    url: "https://glassfish.dev.java.net/nonav/public/CDDL+GPL.html"
  },
  {
    name: "CDDL 1.1 + GPL2.0 ClassPath Exception",
    url: "https://glassfish.java.net/public/CDDL+GPL_1_1.html",
    alt_urls: [
      "http://glassfish.java.net/public/CDDL+GPL_1_1.html",
      "https://glassfish.dev.java.net/public/CDDL+GPL_1_1.html"
    ]
  },
  {
    name: "EPL 1.0",
    url: "http://www.eclipse.org/org/documents/epl-v10.php",
    tldr: "https://tldrlegal.com/license/eclipse-public-license-1.0-(epl-1.0)"
  },
  {
    name: "WTFPL",
    url: "http://www.wtfpl.net",
    tldr: "https://tldrlegal.com/license/do-what-the-f*ck-you-want-to-public-license-(wtfpl)"
  },
  {
    name: "Public Domain",
  },
  {
    name: "MPL 1.1",
    url: "https://www.mozilla.org/en-US/MPL/1.1",
    tldr: "https://tldrlegal.com/license/mozilla-public-license-1.1-(mpl-1.1)"
  }
]

function match(name, url) {
  for (var key in licenses) {
    var entry = licenses[key]
    var names = [entry.name]
    if ('alt_names' in entry) {
      names = names.concat(entry['alt_names'])
    }
    var urls = [entry.url]
    if ('alt_urls' in entry) {
      urls = urls.concat(entry['alt_urls'])
    }
    if (names.indexOf(name) >= 0) {
      return entry.name;
    }
    if (urls.indexOf(url) >= 0) {
      return entry.name;
    }
  }
  return undefined
}

module.exports = { licenses, match }