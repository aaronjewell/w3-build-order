import TickEvents from "./TickEvents.js"

describe("TickEvents", () => {

    it("should start with empty resource pools", () => {
        const events = new TickEvents(0);

        expect(Object.keys(events.resourceGain).length).toEqual(0);
        expect(Object.keys(events.resourceLoss).length).toEqual(0);
    });

    it ("should be assigned to a tick", () => {
        const tick = 10;

        const events = new TickEvents(10)

        expect(events.tick).toEqual(10);
    });

    it("should record a number resource gain by key", () => {
        const events = new TickEvents(0);

        events.gainResource({ gold: 10 });

        expect(events.resourceGain.gold).toEqual(10);
    });

    it ("should add existing number resources together", () => {
        const events = new TickEvents(0);

        events.gainResource({ gold: 10 });
        events.gainResource({ gold: 10 });

        expect(events.resourceGain.gold).toEqual(20);
    });

    it ("should record array resource gains", () => {
        const events = new TickEvents(0);

        events.gainResource({ buildings: [ { name: "MockBuilding" } ] });

        expect(events.resourceGain.buildings.length).toEqual(1);
    });

    it ("should push new resources into gained arrays", () => {
        const events = new TickEvents(0);

        events.gainResource({ buildings: [ { name: "MockBuilding" } ] });
        events.gainResource({ buildings: [ { name: "MockBuilding 2" } ] });

        expect(events.resourceGain.buildings.length).toEqual(2);
    });

    it ("should record number resources lost", () => {
        const events = new TickEvents(0);

        events.loseResource({ gold: 10 });

        expect(events.resourceLoss.gold).toEqual(10);
    })

    it ("should record array resources lost", () => {
        const events = new TickEvents(0);

        events.loseResource({ buildings: [ { name: "MockBuilding" } ] });

        expect(events.resourceLoss.buildings.length).toEqual(1);
    })

    it ("should combine array resources lost", () => {
        const events = new TickEvents(0);

        events.loseResource({ buildings: [ { name: "MockBuilding" } ] });
        events.loseResource({ buildings: [ { name: "MockBuilding 2" } ] });

        expect(events.resourceLoss.buildings.length).toEqual(2);
    });

    it ("should add actions", () => {
        const events = new TickEvents(0);

        events.addAction({ type: "Mock" });

        expect(events.actions.length).toEqual(1);
    })
})