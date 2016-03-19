const getCost = function (state) {
  state.includes('-')
  ? state = /-\d.*/g.exec(state)[0]
  : state = /\d.*/g.exec(state)[0]
  return state;
}

export {
  getCost
}