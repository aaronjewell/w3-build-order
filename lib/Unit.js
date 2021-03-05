export default class Unit {
  static _id = 1

  constructor({
    id,
    name,
    gold,
    lumber,
    supply,
    buildTime,
    image,
    type,
    canBuild = false,
    canHarvest = false,
    canMine = false,
    isHero = false,
  }) {
    this._id = Unit._id++
    this.id = id
    this.name = name
    this.gold = gold
    this.lumber = lumber
    this.supply = supply
    this.buildTime = buildTime
    this.canBuild = canBuild
    this.canHarvest = canHarvest
    this.canMine = canMine
    this.isHero = isHero
    this.image = image
    this.type = type
  }

  static resetIds() {
    Unit._id = 1
  }
}
