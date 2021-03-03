import Race from "./Race";

describe("Race", () => {
  describe("buildings", () => {
    it("should return an empty array for the base class", () => {
      const race = new Race();

      expect(race.buildings()).toEqual([]);
    });

    it("should return the units list from an extended subclass", () => {
      class NewRace extends Race {
        static units = [{ id: "newRaceUnit" }];
      }

      const newRace = new NewRace();

      expect(newRace.units()).toEqual(NewRace.units);
    });
  });

  describe("units", () => {
    it("should return an empty array for the base class", () => {
      const race = new Race();

      expect(race.units()).toEqual([]);
    });

    it("should return the units list from an extended subclass", () => {
      class NewRace extends Race {
        static buildings = [{ id: "newRaceBuilding" }];
      }

      const newRace = new NewRace();

      expect(newRace.buildings()).toEqual(NewRace.buildings);
    });
  });
});
