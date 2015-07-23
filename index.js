"use strict";

var messages = require("./commit_messages");
var names = [
  "Nick", "Steve", "Andy", "Qi", "Fanny", "Sarah", "Cord", "Todd",
  "Chris", "Pasha", "Gabe", "Tony", "Jason", "Randal", "Ali", "Kim",
  "Rainer", "Guillaume", "Kelan", "David", "John", "Stephen", "Tom",
  "Steven", "Jen", "Marcus", "Edy", "Rachel"
];
// Behaves *kinda like* Python"s `random.choice()`.
var random_choice = function (keys) {
  return keys[Math.floor(Math.random() * keys.length)];
};

exports.whatThe = function () {
  var hash = random_choice(Object.keys(messages));
  var message = messages[hash];
  var url = "http://whatthecommit.com/" + hash;

  message = message
    .replace(/XNAMEX/g, random_choice(names))
    .replace(/XUPPERNAMEX/g, random_choice(names).toUpperCase())
    .replace(/XLOWERNAMEX/g, random_choice(names).toLowerCase());

  return {
    message: message,
    permalink: url
  };
};
