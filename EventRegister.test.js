import Action from "./Action.js";
import Building from "./Building.js";
import EventRegister from "./EventRegister.js";
import Orc from "./Orc.js";
import ResourceList from "./ResourceList.js";
import TickEvent from "./TickEvents.js";
import Unit from "./Unit.js";

import orcBuildings from "./data/orc/buildings.js";
import orcUnits from "./data/orc/units.js";

describe("EventRegister", () => {
  it("should add TickEvents to the correct index", () => {
    const register = new EventRegister(Orc.startingResources);

    const event = register.eventsAt(10);

    expect(register.eventsIndices.length).toEqual(1);
    expect(!!register.events[10]).toEqual(true);
  });


  it("should return the correct resources after processing train events", () => {
    const tick = 0;
    const register = new EventRegister(Orc.startingResources);

    const peonData = orcUnits.find((u) => u.id === "peon");
    const greatHallData = orcBuildings.find((b) => b.id === "greatHall");

    const peon = new Unit(peonData);
    const greatHall = new Building(greatHallData);

    register.addAction(tick, Action.build(tick, peon, greatHallData));

    expect(register.processTo(tick + 1).buildings.length).toEqual(1);
    expect(register.processTo(tick + 1).units.length).toEqual(4);
    expect(
      register.processTo(tick + greatHallData.buildTime).buildings.length
    ).toEqual(2);
    expect(
      register.processTo(tick + greatHallData.buildTime).units.length
    ).toEqual(5);
  });

  it("should process to tick idempotently", () => {
    const tick = 0;
    const register = new EventRegister(Orc.startingResources);

    const peonData = orcUnits.find((u) => u.id === "peon");
    const greatHallData = orcBuildings.find((b) => b.id === "greatHall");

    const peon = new Unit(peonData);
    const greatHall = new Building(greatHallData);

    register.addAction(tick, Action.train(tick, peonData, greatHall));

    const endTime = tick + peonData.buildTime;

    register.processTo(endTime);
    register.processTo(endTime);
    register.processTo(endTime);
    expect(register.processTo(endTime).buildings.length).toEqual(1);
    expect(register.processTo(endTime).units.length).toEqual(6);
  });

  it("should add event actions", () => {
    const tick = 0;
    const register = new EventRegister(Orc.startingResources);

    const events = register.eventsAt(tick);

    expect(events.actions.length).toEqual(0);

    const peonData = orcUnits.find((u) => u.id === "peon");
    const greatHallData = orcBuildings.find((b) => b.id === "greatHall");

    const greatHall = new Building(greatHallData);

    const action = Action.train(tick, peonData, greatHall);

    register.addAction(tick, action);

    expect(events.actions.length).toEqual(1);
  });

  it("should remove event actions by id", () => {
    const tick = 0;
    const register = new EventRegister(Orc.startingResources);

    const events = register.eventsAt(tick);

    const peonData = orcUnits.find((u) => u.id === "peon");
    const greatHallData = orcBuildings.find((b) => b.id === "greatHall");

    const greatHall = new Building(greatHallData);

    const action = Action.train(tick, peonData, greatHall);

    register.addAction(tick, action);

    expect(events.actions.length).toEqual(1);

    register.removeAction(tick, action._id);

    expect(events.actions.length).toEqual(0);
  });
});
