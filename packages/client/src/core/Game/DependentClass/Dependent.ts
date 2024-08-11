export default abstract class Dependent<T extends object> {
  state: T;
  constructor(state: T) {
    this.state = state;
  }
}
