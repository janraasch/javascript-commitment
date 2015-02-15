# javascript-commitment [![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] ![more fixes](http://img.shields.io/badge/more-fixes-ff69b0.svg)

JavaScript adoption of the great [Commitment](https://github.com/ngerakines/commitment) project. For a quick laugh and a **random commit message** for the gentle programmer.

*Visit [http://whatthecommit.com/](http://whatthecommit.com/) for the web version.*

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

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Jan Raasch](http://janraasch.com)

[npm-url]: https://npmjs.org/package/javascript-commitment
[npm-image]: http://img.shields.io/npm/v/javascript-commitment.svg

[travis-url]: http://travis-ci.org/janraasch/javascript-commitment
[travis-image]: https://travis-ci.org/janraasch/javascript-commitment.svg?branch=master
