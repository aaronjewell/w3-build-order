export default class NeutralUnit {
  static _id = 1

  constructor({
    id,
    canHarvest = false,
    gold,
    image,
    isHero = false,
    lumber,
    name,
    supply,
    order,
    type,
  }) {
    this._id = NeutralUnit._id++
    this.id = id
    this.canHarvest = canHarvest
    this.gold = gold
    this.image = image
    this.isHero = isHero
    this.lumber = lumber
    this.name = name
    this.supply = supply
    this.order = order
    this.type = type
  }

  static resetIds() {
    NeutralUnit._id = 1
  }
}
