export default function Unit(
  { id, name, gold, lumber, food, buildTime, states },
  started,
  completed = null
) {
  this._id = Unit._id++;
  this.id = id;
  this.name = name;
  this.gold = gold;
  this.lumber = lumber;
  this.food = food;
  this.buildTime = buildTime;
  this.states = states;

  this.started = started;
  this.completed = completed;

  this.activeStates = [];
}

Unit._id = 1;

Unit.prototype.isIdle = function (tick, duration = 0) {
  return !this.currentAction(tick, duration) && this.completed <= tick;
};

Unit.prototype.tryAction = function (action, tick, duration) {
  if (!this.takeAction(action, tick, duration)) {
    console.log(`${this.id} ${this._id} can't do ${action}`);
    return false;
  }
  return true;
};

Unit.prototype.takeAction = function (action, tick, duration) {
  // Check that we can take that action
  if (!this.states.includes(action.type)) {
    console.log("Cant take action, unit states does not include: ", action);
    return false;
  }

  // Check if the unit is available at that time.
  if (
    tick < this.completed ||
    (!this.completed === null && tick < this.started + this.buildTime)
  ) {
    console.log(
      "Can't take action, unit was not completed (",
      this.completed,
      ") before: ",
      tick
    );
    return false;
  }

  if (this.currentAction) {
      this.currentAction.duration = Math.max(0, tick - this.currentAction.start - 1);
  }

  this.currentAction = { state: action, start: tick, duration };

  this.activeStates.push(this.currentAction);

  return true;
};

Unit.prototype.isTakingAction = function (action, tick, duration = 0) {
  for (const state of this.activeStates) {
    if (
      tick >= state.start &&
      tick <= state.start + state.duration &&
      state.state === action
    ) {
      return true;
    }
  }
  return false;
};

Unit.prototype.planAction = function (type, tick, duration, valid, meta) {
  return {
    start: tick,
    duration,
    type,
    valid,
    meta,
  };
};
