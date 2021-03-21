export default class Building {
  static _id = 1

  constructor({
    id,
    name,
    gold,
    lumber,
    buildTime,
    dependsOn,
    supply,
    type,
    units,
    upgrades,
    items,
    image,
  }) {
    this._id = Building._id++
    this.id = id
    this.name = name
    this.gold = gold
    this.lumber = lumber
    this.buildTime = buildTime
    this.dependsOn = dependsOn
    this.units = units
    this.upgrades = upgrades
    this.items = items
    this.supply = supply
    this.image = image
    this.type = type
  }

  static resetIds() {
    Building._id = 1
  }
}
