"use strict";

// Behaves *kinda like* Python"s `random.choice()`.
var random_choice = function (keys) {
  return keys[Math.floor(Math.random() * keys.length)];
};
// Returns a random integer between start (included) and end (included).
var random_integer = function (start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};
// Returns a Number, e.g. "10" => 10
var to_number = function (string) {
  return parseInt(string, 10);
};
// Replaces `match` XNUM5,10X with `random_integer(5,10).toString`.
var replace_xnumx = function (match, value) {
  var start = 1;
  var end = 999;
  if (value.length === 0) { // value = ''
    value = end.toString();
  }
  var position = value.indexOf(",");
  if (position > -1) {
    if (position === 0) { // XNUM,5X
      end = to_number(value.substring(1));
    } else {
      if (position === value.length - 1) { // XNUM5,X
        start = to_number(value.substring(0, position));
      } else { // XNUM1,5X
        start = to_number(value.substring(0, position));
        end = to_number(value.substring(position + 1));
      }
    }
  } else {
    end = to_number(value);
  }
  if (start > end) {
    end = start * 2;
  }

  return random_integer(start, end).toString();
};

exports.random_choice = random_choice;
exports.random_integer = random_integer;
exports.to_number = to_number;
exports.replace_xnumx = replace_xnumx;
