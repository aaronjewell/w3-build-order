import State from "./State.js"
import Orc from "./Orc.js";

describe("State", () => {
    it("should start with resources", () => {
        const state = new State(Orc);

        const atZero = state.resourceManager.resourcesAt(0);

        expect(atZero.buildings.length).toEqual(1);
        expect(atZero.units.length).toEqual(5);
        expect(atZero.gold).toEqual(500);
        expect(atZero.lumber).toEqual(150);
    });

    it ("should default to tick 0", () => {
        const state = new State(Orc);

        expect(state.tick).toEqual(0);
    })

    it ("should have units", () => {
        const state = new State(Orc);

        expect(state.units.length).toEqual(5);
        expect(state.units.every(u => u.id === "peon")).toEqual(true);
    });

    it ("should have buildings", () => {
        const state = new State(Orc);

        expect(state.buildings.length).toEqual(1);
        expect(state.buildings[0].id).toEqual("greatHall");
    });

    it ("should have available buildings", () => {
        const state = new State(Orc);

        expect(state.availableBuildings.length > 0).toEqual(true);
    });
})