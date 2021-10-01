export class Counter {
  state = { count: 0 };
  constructor(state, env) {
    this.state = state;
  }
  add() {
    this.state = { count: this.state.count + 1 };
  }
  getCount() {
    return this.state.count;
  }
}
