export default function Building(
  { id, name, gold, lumber, buildTime, dependsOn, supply, units, tier, image },
) {
  this._id = Building._id++;
  this.id = id;
  this.name = name;
  this.gold = gold;
  this.lumber = lumber;
  this.buildTime = buildTime;
  this.dependsOn = dependsOn;
  this.units = units;
  this.supply = supply;
  this.tier = tier;
  this.image = image;
}

Building._id = 1;