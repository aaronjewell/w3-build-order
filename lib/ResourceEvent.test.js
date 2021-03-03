import Action from "./Action";
import ResourceEvent from "./ResourceEvent";
import ResourceList from "./ResourceList";
import Unit from "./Unit";

import unitData from "../data/orc/units";

describe("ResourceEvent", () => {
  describe("loseResources", () => {
    it("should accept resource lists and plain objects", () => {
      const tick = 0;

      const peonData = unitData.find((u) => u.id === "peon");
      const peon = new Unit(peonData);

      const action = Action.assignToGold(tick, peon);
      const re = new ResourceEvent(tick, action._id);

      const units = [peon];
      const gold = 100;

      re.loseResources({ units });
      re.loseResources(new ResourceList({ gold }));

      expect(re.resourceLoss.value.units).toEqual([peon]);
      expect(re.resourceLoss.value.gold).toEqual(gold);
      expect(re.tick).toEqual(action.start);
    });

    it("should store the resources that are lost for a specific action", () => {
      const tick = 0;

      const peonData = unitData.find((u) => u.id === "peon");
      const peon = new Unit(peonData);

      const action = Action.assignToGold(tick, peon);
      const re = new ResourceEvent(tick, action._id);

      const units = [peon];

      re.loseResources({ units });

      expect(re.resourceLoss.value.units).toEqual([peon]);
      expect(re.tick).toEqual(action.start);
    });
  });

  describe("gainResources", () => {
    it("should accept resource lists and plain objects", () => {
      const tick = 0;

      const peonData = unitData.find((u) => u.id === "peon");
      const peon = new Unit(peonData);

      const action = Action.assignToGold(tick, peon);
      const re = new ResourceEvent(tick, action._id);

      const units = [peon];
      const gold = 100;

      re.gainResources({ units });
      re.gainResources(new ResourceList({ gold }));

      expect(re.resourceGain.value.units).toEqual([peon]);
      expect(re.resourceGain.value.gold).toEqual(gold);
      expect(re.tick).toEqual(action.start);
    });

    it("should store the resources that are lost for a specific action", () => {
      const tick = 0;

      const peonData = unitData.find((u) => u.id === "peon");
      const peon = new Unit(peonData);

      const action = Action.assignToGold(tick, peon);
      const re = new ResourceEvent(tick, action._id);

      const units = [peon];

      re.gainResources({ units });

      expect(re.resourceGain.value.units).toEqual([peon]);
      expect(re.tick).toEqual(action.start);
    });
  })
});
