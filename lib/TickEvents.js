import ResourceList from "./ResourceList";

export default class TickEvents {
  constructor(tick) {
    this.tick = tick;
  }

  actions = [];

  addAction(action) {
    this.actions.push(action);
  }

  removeAction(id) {
    const index = this.actions.findIndex((a) => a._id === id);
    if (index >= 0) {
      this.actions.splice(index, 1);
    }
  }
}
