import ActionManager from "./ActionManager.js";
import Building from "./Building.js";
import Orc from "./Orc.js";
import ResourceManager from "./ResourceManager.js";
import Unit from "./Unit.js";

import orcUnits from "./data/orc/units.js";
import orcBuildings from "./data/orc/buildings.js";

describe("ActionManager", () => {
  it("should return the correct resources after processing train events", () => {
    const resourceManager = new ResourceManager();
    const actionManager = new ActionManager(Orc, resourceManager);

    const tick = 0;

    const peonData = orcUnits.find((u) => u.id === "peon");
    const greatHallData = orcBuildings.find((b) => b.id === "greatHall");

    const peon = new Unit(peonData);
    const greatHall = new Building(greatHallData);

    actionManager.train(tick, peonData, greatHall);

    expect(resourceManager.resourcesAt(tick + 1).buildings.length).toEqual(0);
    expect(resourceManager.resourcesAt(tick + 1).units.length).toEqual(5);
    expect(
      resourceManager.resourcesAt(tick + peonData.buildTime).buildings.length
    ).toEqual(1);
    expect(
      resourceManager.resourcesAt(tick + peonData.buildTime).units.length
    ).toEqual(6);
  });
});
