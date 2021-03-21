export default class Upgrade {
  constructor({
    id,
    name,
    gold,
    lumber,
    buildTime,
    tier,
    replaces,
    dependsOn,
    image,
  }) {
    this.id = id
    this.name = name
    this.gold = gold
    this.lumber = lumber
    this.buildTime = buildTime
    this.tier = tier
    this.replaces = replaces
    this.dependsOn = dependsOn
    this.image = image
  }
}
