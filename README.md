# javascript-commitment [![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] ![more fixes](https://img.shields.io/badge/more-fixes-ff69b0.svg)
[![Pay me][paypal-svg]][paypal-dot-me] [![Sponsor me][github-sponsors-svg]][github-sponsors]

> JavaScript adoption of the great [Commitment][commitment-url] project. For a quick laugh and a **random commit message** for the gentle programmer.

*Visit [http://whatthecommit.com/](http://whatthecommit.com/) for the web version.*

## Sponsor 💟

Support my work on this piece of open-source software via [GitHub Sponsors][github-sponsors] (recurring) or [PayPal][paypal-dot-me] (one-time).

[![GitHub Stats](https://github-readme-stats.vercel.app/api/?username=janraasch)][github-sponsors]

## Usage
Install via `npm install javascript-commitment`. Then use the module in your code:

```javascript
var commitment = require('javascript-commitment');
var commit = commitment.whatThe();

console.log('Random commit message', commit.message);
// (\ /)
// (O.o)
// (> <) Bunny approves these changes.

console.log('Link to the web version', commit.permalink);
// http://whatthecommit.com/0e0c1a4060a298158f3c4ef526f03f86
```

## API `commitment.whatThe`
Returns a JavaScript Object with a `message` String and a `permalink` String.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Jan Raasch](https://www.janraasch.com)

[commitment-url]: https://github.com/ngerakines/commitment

[npm-url]: https://npmjs.org/package/javascript-commitment
[npm-image]: https://img.shields.io/npm/v/javascript-commitment.svg

[travis-url]: https://travis-ci.org/janraasch/javascript-commitment
[travis-image]: https://travis-ci.org/janraasch/javascript-commitment.svg?branch=master


[paypal-dot-me]: https://www.paypal.me/janraasch/14,00
[github-sponsors]: https://github.com/sponsors/janraasch
[paypal-svg]: https://img.shields.io/badge/onetime-donation-11dde2.svg?logo=paypal
[github-sponsors-svg]: https://img.shields.io/badge/recurring-sponsorship-ee4aaa.svg?logo=github
