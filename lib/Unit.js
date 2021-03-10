export default class Unit {
  static _id = 1

  constructor({
    id,
    buildTime,
    canBuild = false,
    canHarvest = false,
    canMine = false,
    image,
    isHero = false,
    order,
    gold,
    lumber,
    name,
    supply,
    type,
  }) {
    this._id = Unit._id++
    this.id = id
    this.buildTime = buildTime
    this.canBuild = canBuild
    this.canHarvest = canHarvest
    this.canMine = canMine
    this.gold = gold
    this.isHero = isHero
    this.order = order
    this.image = image
    this.lumber = lumber
    this.name = name
    this.supply = supply
    this.type = type
  }

  static resetIds() {
    Unit._id = 1
  }
}
