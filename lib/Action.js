export default class Action {
  static _id = 1

  constructor({ type, start, valid, duration, meta }) {
    this._id = Action._id++
    this.type = type
    this.start = start
    this.valid = valid
    this.duration = duration
    this.meta = meta
  }

  static build(start, buildingData, worker) {
    return new Action({
      type: "build",
      start,
      duration: buildingData.buildTime,
      valid: true,
      meta: { worker, building: buildingData },
    })
  }

  static buy(start, itemData, building) {
    return new Action({
      type: "buy",
      start,
      duration: 0,
      valid: true,
      meta: { building, item: itemData },
    })
  }

  static train(start, unitData, building) {
    return new Action({
      type: "train",
      start,
      duration: unitData.buildTime || 0,
      valid: true,
      meta: { unit: unitData, building },
    })
  }

  static upgrade(start, upgradeData, building) {
    return new Action({
      type: "upgrade",
      start,
      duration: upgradeData.buildTime,
      valid: true,
      meta: { building, upgrade: upgradeData },
    })
  }

  static assignToGold(start, worker) {
    return new Action({
      type: "assignToGold",
      start,
      duration: 0,
      valid: true,
      meta: { worker },
    })
  }

  static removeFromGold(start, worker) {
    return new Action({
      type: "removeFromGold",
      start,
      duration: 0,
      valid: true,
      meta: { worker },
    })
  }

  static assignToLumber(start, worker) {
    return new Action({
      type: "assignToLumber",
      start,
      duration: 0,
      valid: true,
      meta: { worker },
    })
  }

  static removeFromLumber(start, worker) {
    return new Action({
      type: "removeFromLumber",
      start,
      duration: 0,
      valid: true,
      meta: { worker },
    })
  }
}
