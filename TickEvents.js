import ResourceList from "./ResourceList.js";

export default function TickEvents(tick) {
    this.tick = tick;
    this.actions = [];
}

TickEvents.prototype.addAction = function(action) {
    this.actions.push(action);
}

TickEvents.prototype.removeAction = function (id) {
  const index = this.actions.findIndex((a) => a._id === id);
  if (index >= 0) {
    this.actions.splice(index, 1);
  }
};
