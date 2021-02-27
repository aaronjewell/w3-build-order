export default function BuildingManager(race) {
  this.race = race;
}

BuildingManager.prototype.availableBuildings = function ({
  buildings = [],
  gold,
  lumber,
}) {
  return this.race.buildings
    .filter((b) => {
      return b.dependsOn.every((dependency) => {
        return buildings.some((completed) => completed.id === dependency);
      });
    })
    .filter((b) => b.gold <= gold && b.lumber <= lumber);
};

BuildingManager.prototype.availableUnits = function (
  building,
  { units = [], buildings = [], gold, lumber, supply }
) {
  const heroCount = units.filter((u) => u.isHero).length;
  const tier = buildings.reduce(
    (highestTier, building) => Math.max(highestTier, building.tier || 0),
    1
  );

  return building.units
    .map((id) => this.race.units.find((unit) => unit.id === id))
    .filter((u) => u.gold <= gold && u.lumber <= lumber && u.supply <= supply)
    .filter((u) => !(u.isHero && heroCount === tier) || !u.isHero);
};
