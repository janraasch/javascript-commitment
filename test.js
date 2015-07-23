/*eslint-env mocha*/
"use strict";

var assert = require("assert");
var _ = require("lodash");
var sut = require("./index");

describe("javascript-commitment", function () {
  describe("whatThe", function () {
    _.times(500, function (n) {
      n = n + 1;
      it("returns a random message and its link (try #" + n + ")", function () {
        var response = sut.whatThe();
        var message = response.message;
        var permalink = response.permalink;

        assert.strictEqual(_.isString(message), true);
        assert.strictEqual(_.isString(permalink), true);
        assert.strictEqual(permalink.indexOf("http://whatthecommit.com/"), 0);
        assert.strictEqual(message.indexOf("XNAMEX"), -1);
        assert.strictEqual(message.indexOf("XUPPERNAMEX"), -1);
        assert.strictEqual(message.indexOf("XLOWERNAMEX"), -1);
        assert.strictEqual(message.match(/XNUM([0-9,]*)X/g), null);
      });
    });
  });
});
