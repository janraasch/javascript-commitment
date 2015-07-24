/*eslint-env mocha*/
"use strict";

var assert = require("assert");
var _ = require("lodash");
var sut = require("./index");
var lib = require("./lib");
var quick_check = function (describe_string, it_string, it_func) {
  return describe(describe_string, function () {
    return _.times(500, function (n) {
      n = n + 1;
      return it(it_string + " (try #" + n + ")", function () { return it_func; });
    });
  });
};

describe("javascript-commitment", function () {
  describe("lib.to_number", function () {
    it("converts a String to a Number", function () {
      assert.strictEqual(lib.to_number("10"), 10);
      assert.strictEqual(lib.to_number("45682"), 45682);
    });
  });
  describe("lib.random_integer", function () {
    quick_check("produces a random number x", "with 93 < x < 100",
    function () {
      var result = lib.random_integer(94, 99);
      assert.strictEqual((result < 100), true);
      assert.strictEqual((result > 93), true);
    });
  });
  describe("lib.replace_xnumx", function () {
    quick_check("replaces XNUMX with a random integer x", "with 0 < x < 1000",
    function () {
      var result = parseInt(lib.replace_xnumx(null, ""), 10);
      assert.strictEqual((result < 1000), true);
      assert.strictEqual((result > 0), true);
    });
    quick_check("replaces XNUM3X with a random integer x", "with 0 < x < 4",
    function () {
      var result = parseInt(lib.replace_xnumx(null, "3"), 10);
      assert.strictEqual((result < 4), true);
      assert.strictEqual((result > 0), true);
    });
    quick_check("replaces XNUM,5X with a random integer x", "with 0 < x < 6",
    function () {
      var result = parseInt(lib.replace_xnumx(null, ",5"), 10);
      assert.strictEqual((result < 6), true);
      assert.strictEqual((result > 0), true);
    });
    quick_check("replaces XNUM600,X with a random integer x", "with 599 < x < 1000",
    function () {
      var result = parseInt(lib.replace_xnumx(null, "600,"), 10);
      assert.strictEqual((result < 1000), true);
      assert.strictEqual((result > 599), true);
    });
    quick_check("replaces XNUM600,670X with a random integer x", "with 599 < x < 671",
    function () {
      var result = parseInt(lib.replace_xnumx(null, "600,670"), 10);
      assert.strictEqual((result < 671), true);
      assert.strictEqual((result > 599), true);
    });
  });
  quick_check("whatThe", "returns a random message and its link", function () {
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
