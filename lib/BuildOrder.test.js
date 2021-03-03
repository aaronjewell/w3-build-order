import BuildOrder from "./BuildOrder";
import Orc from "./Orc";

describe("BuildOrder", () => {
  it("should start with resources", () => {
    const buildOrder = new BuildOrder(Orc);

    const atZero = buildOrder.resourceManager.resourcesAt(0);

    expect(atZero.buildings.length).toEqual(1);
    expect(atZero.units.length).toEqual(5);
    expect(atZero.gold).toEqual(500);
    expect(atZero.lumber).toEqual(150);
  });

  it("should default to tick 0", () => {
    const state = new BuildOrder(Orc);

    expect(state.tick).toEqual(0);
  });

  it("should have units", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.units.length).toEqual(5);
    expect(buildOrder.units.every((u) => u.id === "peon")).toEqual(true);
  });

  it("should have buildings", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.buildings.length).toEqual(1);
    expect(buildOrder.buildings[0].id).toEqual("greatHall");
  });

  it("should have availableBuildings", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.availableBuildings.length > 0).toEqual(true);
  });

  it("shoud have availableUnits", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.availableUnits.length > 0).toEqual(true);
  });

  it("should have gold", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.gold).toEqual(Orc.startingResources.value.gold);
  });

  it("should have lumber", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.lumber).toEqual(Orc.startingResources.value.lumber);
  });

  it("should have remaining supply", () => {
    const buildOrder = new BuildOrder(Orc);
    const usedSupply = Orc.startingResources.value.units.reduce(
      (supply, u) => supply + u.supply,
      0
    );
    const startingSupply = Orc.startingResources.value.supply;

    expect(buildOrder.supply).toEqual(startingSupply - usedSupply);
  });

  it("should have totalSupply", () => {
    const buildOrder = new BuildOrder(Orc);
    const startingSupply = Orc.startingResources.value.supply;

    expect(buildOrder.totalSupply).toEqual(startingSupply);

    const worker = buildOrder.units.find((u) => u.id === "peon");
    const orcBurrowData = buildOrder.availableBuildings.find(
      (b) => b.id === "orcBurrow"
    );

    buildOrder.build(orcBurrowData, worker);

    expect(buildOrder.totalSupply).toEqual(startingSupply);

    buildOrder.tick = buildOrder.tick + orcBurrowData.buildTime;

    expect(buildOrder.totalSupply).toEqual(
      startingSupply + orcBurrowData.supply
    );
  });

  it("should have actions", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.actions).toEqual([]);

    const worker = buildOrder.units.find((u) => u.id === "peon");
    const orcBurrow = buildOrder.availableBuildings.find(
      (b) => b.id === "orcBurrow"
    );

    buildOrder.build(orcBurrow, worker);

    expect(buildOrder.actions.length).toEqual(1);
    expect(buildOrder.actions[0].type).toEqual("build");
  });

  it("should have mining workers", () => {
    const buildOrder = new BuildOrder(Orc);
    const [peon, ...restUnits] = buildOrder.units;

    expect(buildOrder.miningWorkers).toEqual(0);
    buildOrder.assignToGold(peon);
    expect(buildOrder.miningWorkers).toEqual(1);
  });

  it("should have harvesting workers", () => {
    const buildOrder = new BuildOrder(Orc);
    const [peon, ...restUnits] = buildOrder.units;

    expect(buildOrder.harvestingWorkers).toEqual(0);
    buildOrder.assignToLumber(peon);
    expect(buildOrder.harvestingWorkers).toEqual(1);
  });

  it("should have available buildings", () => {
    const buildOrder = new BuildOrder(Orc);

    expect(buildOrder.availableBuildings.length > 0).toEqual(true);
  });

  it("should have completed buildings", () => {
    const buildOrder = new BuildOrder(Orc);

    const worker = buildOrder.units.find((u) => u.id === "peon");
    const orcBurrowData = buildOrder.availableBuildings.find(
      (b) => b.id === "orcBurrow"
    );

    expect(buildOrder.completedBuildings.length).toEqual(
      Orc.startingResources.value.buildings.length
    );

    buildOrder.build(orcBurrowData, worker);

    expect(buildOrder.completedBuildings.length).toEqual(
      Orc.startingResources.value.buildings.length
    );

    buildOrder.tick = buildOrder.tick + orcBurrowData.buildTime;

    const complete = buildOrder.completedBuildings;
    const starting = Orc.startingResources.value.buildings;

    expect(complete.length).toEqual(starting.length + 1);
    for (let i = 0; i < complete; i++) {
      expect(complete[i].id).toEqual(starting[i].id);
    }
  });

  it("should be able to reset the tick", () => {
    const buildOrder = new BuildOrder(Orc);

    buildOrder.tick = 1;
    buildOrder.reset();

    expect(buildOrder.tick).toEqual(0);
  });

  describe("availableUnitsForBuilding", () => {
    it("should return units that can be trained for a building at the tick", () => {
      const buildOrder = new BuildOrder(Orc);
      const [greatHall, ...restBuildings] = buildOrder.buildings;
      const [peon, ...restUnits] = buildOrder.units;
      const peonData = Orc.units.find((u) => u.id === "peon");
      const gruntData = Orc.units.find((u) => u.id === "grunt");
      const barracksData = Orc.buildings.find((b) => b.id === "barracks");

      expect(greatHall.id).toEqual("greatHall");

      const available = buildOrder.availableUnitsForBuilding(greatHall);

      expect(available.length).toEqual(1);
      expect(available[0]).toEqual(peonData);

      buildOrder.build(barracksData, peon);

      buildOrder.tick = buildOrder.tick + barracksData.buildTime;

      expect(buildOrder.buildings.length).toEqual(2);

      const [_greatHall, barracks] = buildOrder.buildings;

      const newAvailable = buildOrder.availableUnitsForBuilding(barracks);

      expect(newAvailable.length).toEqual(1);
      expect(newAvailable[0].id).toEqual(gruntData.id);
    });
  });

  describe("train", () => {
    it("should be able to train a unit", () => {
      const buildOrder = new BuildOrder(Orc);
      const [greatHall, ...restBuildings] = buildOrder.buildings;
      const peonData = Orc.units.find((u) => u.id === "peon");

      expect(buildOrder.units.length).toEqual(
        Orc.startingResources.value.units.length
      );
      buildOrder.train(peonData, greatHall);
      expect(buildOrder.units.length).toEqual(
        Orc.startingResources.value.units.length
      );

      buildOrder.tick = buildOrder.tick + peonData.buildTime;

      expect(buildOrder.units.length).toEqual(
        Orc.startingResources.value.units.length + 1
      );
    });
  });

  describe("assignToGold", () => {
    const buildOrder = new BuildOrder(Orc);
    const [peon, ...restUnits] = buildOrder.units;

    expect(buildOrder.units.length).toEqual(
      Orc.startingResources.value.units.length
    );
    buildOrder.assignToGold(peon);
    expect(buildOrder.units.length).toEqual(
      Orc.startingResources.value.units.length - 1
    );
  });

  describe("removeAction", () => {
    it("should remove an action from the list", () => {
      const buildOrder = new BuildOrder(Orc);
      const [peon, anotherPeon, ...restUnits] = buildOrder.units;

      expect(buildOrder.actions.length).toEqual(0);
      buildOrder.assignToGold(peon);
      expect(buildOrder.actions.length).toEqual(1);
      buildOrder.assignToGold(anotherPeon);
      expect(buildOrder.actions.length).toEqual(2);
      buildOrder.removeAction(buildOrder.actions[0]);
      expect(buildOrder.actions.length).toEqual(1);
    });
  });
});
