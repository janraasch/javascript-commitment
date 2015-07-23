"use strict";

var messages = require("./commit_messages");
var lib = require("./lib");
var names = [
  "Nick", "Steve", "Andy", "Qi", "Fanny", "Sarah", "Cord", "Todd",
  "Chris", "Pasha", "Gabe", "Tony", "Jason", "Randal", "Ali", "Kim",
  "Rainer", "Guillaume", "Kelan", "David", "John", "Stephen", "Tom",
  "Steven", "Jen", "Marcus", "Edy", "Rachel"
];

exports.whatThe = function () {
  var hash = lib.random_choice(Object.keys(messages));
  var message = messages[hash];
  var url = "http://whatthecommit.com/" + hash;

  message = message
    .replace(/XNAMEX/g, lib.random_choice(names))
    .replace(/XUPPERNAMEX/g, lib.random_choice(names).toUpperCase())
    .replace(/XLOWERNAMEX/g, lib.random_choice(names).toLowerCase())
    .replace(/XNUM([0-9,]*)X/g, lib.replace_xnumx);

  return {
    message: message,
    permalink: url
  };
};
