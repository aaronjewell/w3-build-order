export default class NeutralBuilding {
  static _id = 1

  constructor({ id, name, type, units, items, image }) {
    this._id = NeutralBuilding._id++
    this.id = id
    this.name = name
    this.units = units
    this.items = items
    this.image = image
    this.type = type
  }
}
