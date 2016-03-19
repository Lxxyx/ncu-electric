'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCost = function getCost(state) {
  state.includes('-') ? state = /-\d.*/g.exec(state)[0] : state = /\d.*/g.exec(state)[0];
  return state;
};

exports.getCost = getCost;