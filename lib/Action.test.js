import Action from "./Action";
import Building from "./Building";
import Unit from "./Unit";

import buildingData from "../data/orc/buildings";
import unitData from "../data/orc/units";

describe("Action", () => {
  describe("train", () => {
    it("should return a new train action", () => {
      const start = 0;
      const unitData = {};
      const building = new Unit(buildingData[0]);

      const action = Action.train(start, unitData, building);

      expect(action.type).toEqual("train");
      expect(action.start).toEqual(0);
      expect(action.meta.unit).toEqual(unitData);
      expect(action.meta.building).toEqual(building);
    });
  });

  describe("build", () => {
    it("should return a new build action", () => {
      const start = 0;
      const buildingData = {};
      const worker = new Unit(unitData.find((u) => u.id === "peon"));

      const action = Action.build(start, buildingData, worker);

      expect(action.type).toEqual("build");
      expect(action.start).toEqual(0);
      expect(action.meta.worker).toEqual(worker);
      expect(action.meta.building).toEqual(buildingData);
    });
  });

  describe("assignToGold", () => {
    it("should return a new assign to gold action", () => {
      const start = 0;
      const worker = new Unit(unitData.find((u) => u.id === "peon"));

      const action = Action.assignToGold(start, worker);

      expect(action.type).toEqual("assignToGold");
      expect(action.start).toEqual(0);
      expect(action.meta.worker).toEqual(worker);
    });
  });

  describe("assignToLumber", () => {
    it("should return a new assign to lumber action", () => {
      const start = 0;
      const worker = new Unit(unitData.find((u) => u.id === "peon"));

      const action = Action.assignToLumber(start, worker);

      expect(action.type).toEqual("assignToLumber");
      expect(action.start).toEqual(0);
      expect(action.meta.worker).toEqual(worker);
    });
  });

    describe("removeFromLumber", () => {
      it("should return a new remove from lumber action", () => {
        const start = 0;
        const worker = new Unit(unitData.find((u) => u.id === "peon"));

        const action = Action.removeFromLumber(start, worker);

        expect(action.type).toEqual("removeFromLumber");
        expect(action.start).toEqual(0);
        expect(action.meta.worker).toEqual(worker);
      });
    });

        describe("removeFromGold", () => {
          it("should return a new remove from gold action", () => {
            const start = 0;
            const worker = new Unit(unitData.find((u) => u.id === "peon"));

            const action = Action.removeFromGold(start, worker);

            expect(action.type).toEqual("removeFromGold");
            expect(action.start).toEqual(0);
            expect(action.meta.worker).toEqual(worker);
          });
        });
});
