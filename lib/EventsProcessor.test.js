import clonedeep from "lodash.clonedeep";

import Action from "./Action";
import Building from "./Building";
import EventsProcessor from "./EventsProcessor";
import Orc from "./Orc";
import TickEvents from "./TickEvents";
import Unit from "./Unit";
import orcBuildings from "../data/orc/buildings";
import orcUnits from "../data/orc/units";
import ResourceList from "./ResourceList";

describe("EventsProcessor", () => {
  describe("processAction", () => {
    it("should process build events", () => {
      const tick = 0;
      const burrow = orcBuildings.find((b) => b.id === "orcBurrow");
      const peon = orcUnits.find((u) => u.id === "peon");
      const worker = new Unit(peon);
      const processor = new EventsProcessor();

      const action = new Action({
        type: "build",
        start: tick,
        duration: burrow.buildTime,
        valid: true,
        meta: { worker, building: burrow },
      });

      const resources = Orc.startingResources;

      const [lossEvent, gainEvent] = processor.processAction(action, resources);

      expect(lossEvent.tick).toEqual(tick);
      expect(lossEvent.resourceLoss.value.gold).toEqual(burrow.gold);
      expect(lossEvent.resourceLoss.value.lumber).toEqual(burrow.lumber);
      expect(lossEvent.resourceLoss.value.units.length).toEqual(1);
      expect(lossEvent.resourceLoss.value.units[0]._id).toEqual(worker._id);

      expect(gainEvent.tick).toEqual(tick + burrow.buildTime);
      expect(gainEvent.resourceGain.value.buildings.length).toEqual(1);
      expect(gainEvent.resourceGain.value.buildings[0].id).toEqual(burrow.id);
    });

    it("should process train events", () => {
      const tick = 0;
      const greatHall = orcBuildings.find((b) => b.id === "greatHall");
      const peon = orcUnits.find((u) => u.id === "peon");
      const building = new Building(greatHall);
      const processor = new EventsProcessor();

      const action = new Action({
        type: "train",
        start: tick,
        duration: peon.buildTime,
        valid: true,
        meta: { unit: peon, building },
      });

      const resources = Orc.startingResources;

      const [lossEvent, gainEvent] = processor.processAction(action, resources);

      expect(lossEvent.tick).toEqual(tick);
      expect(lossEvent.resourceLoss.value.gold).toEqual(peon.gold);
      expect(lossEvent.resourceLoss.value.lumber).toEqual(peon.lumber);
      expect(lossEvent.resourceLoss.value.buildings.length).toEqual(1);
      expect(lossEvent.resourceLoss.value.buildings[0]._id).toEqual(
        building._id
      );

      expect(gainEvent.tick).toEqual(tick + peon.buildTime);
      expect(gainEvent.resourceGain.value.units.length).toEqual(1);
      expect(gainEvent.resourceGain.value.units[0].id).toEqual(peon.id);
    });
  });

  describe("validateActions", () => {
    it("should mark actions invalid if resources are not met", () => {
      const tick = 0;
      const greatHall = orcBuildings.find((b) => b.id === "greatHall");
      const peon = orcUnits.find((u) => u.id === "peon");
      const building = new Building(greatHall);
      const processor = new EventsProcessor();

      const actions = [
        new Action({
          type: "train",
          start: tick,
          duration: peon.buildTime,
          valid: true,
          meta: { unit: peon, building },
        }),
      ];

      const resources = new ResourceList({
        buildings: [building],
        gold: peon.gold - 1,
        lumber: peon.lumber - 1,
        supply: peon.supply - 1,
      });
      expect(actions[0].valid).toEqual(true);

      processor.validateActions(actions, resources);

      expect(actions[0].valid).toEqual(false);
    });

    it("should mark an action invalid if the unit limit is exceeded", () => {
      const tick = 0;
      const altar = orcBuildings.find((b) => b.id === "altarOfStorms");
      const bladeMaster = orcUnits.find((u) => u.id === "bladeMaster");
      const building = new Building(altar);
      const processor = new EventsProcessor();

      const actions = [
        new Action({
          type: "train",
          start: tick,
          duration: bladeMaster.buildTime,
          valid: true,
          meta: { unit: bladeMaster, building },
        }),
      ];

      const resources = clonedeep(Orc.startingResources);
      resources.addValues(
        new ResourceList({
          buildings: [building],
          gold: bladeMaster.gold,
          lumber: bladeMaster.lumber,
          supply: bladeMaster.supply,
        })
      );

      processor.validateActions(actions, resources);

      expect(actions[0].valid).toEqual(true);

      actions.push(
        new Action({
          type: "train",
          start: tick,
          duration: bladeMaster.buildTime,
          valid: true,
          meta: { unit: bladeMaster, building },
        })
      );

      processor.validateActions(actions, resources);

      expect(actions[0].valid).toEqual(true);
      expect(actions[1].valid).toEqual(false);
    });

    it("should mark an train action invalid if the buildings build action is removed", () => {
      const tick = 0;
      const altarData = orcBuildings.find((b) => b.id === "altarOfStorms");
      const bladeMasterData = orcUnits.find((u) => u.id === "bladeMaster");
      const peonData = orcUnits.find((u) => u.id === "peon");
      const altar = new Building(altarData);
      const peon = new Unit(peonData);
      const processor = new EventsProcessor();

      const actions = [
        Action.build(tick, altarData, peon),
        Action.train(tick + altarData.buildTime, bladeMasterData, altar)
      ];

      const resources = clonedeep(Orc.startingResources);
      resources.addValues(
        new ResourceList({
          units: [peon],
          buildings: [altar],
          gold: bladeMasterData.gold + altarData.gold,
          lumber: bladeMasterData.lumber + altarData.lumber,
          supply: bladeMasterData.supply,
        })
      );

      processor.validateActions(actions, resources);

      expect(actions[0].valid).toEqual(true);
      expect(actions[1].valid).toEqual(true);

      actions.splice(0, 1);
      resources.removeValues({
          buildings: [altar]
      });

      processor.validateActions(actions, resources);

      expect(resources.value.buildings.length).toEqual(1);
      expect(resources.value.buildings[0].id).toEqual("greatHall");
      expect(actions.length).toEqual(1);
      expect(actions[0].valid).toEqual(false);
    });
  });
});
