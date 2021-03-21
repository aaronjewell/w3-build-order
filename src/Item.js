export default class Item {
  static _id = 1

  constructor({ id, name, gold, lumber, dependsOn, order, type, image }) {
    this._id = Item._id++
    this.id = id
    this.name = name
    this.gold = gold
    this.order = order,
    this.lumber = lumber
    this.dependsOn = dependsOn
    this.image = image
    this.type = type
  }

  static resetIds() {
    Item._id = 1
  }
}
