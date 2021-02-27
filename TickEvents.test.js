import ResourceList from "./ResourceList.js";
import TickEvents from "./TickEvents.js"

describe("TickEvents", () => {

    it ("should be assigned to a tick", () => {
        const tick = 10;

        const events = new TickEvents(10)

        expect(events.tick).toEqual(10);
    });


    it ("should remove actions by id", () => {
        const events = new TickEvents();
        events.actions = [ { _id: 1 }, { _id: 2 }];

        events.removeAction(1);
        
        expect(events.actions.length).toEqual(1);
        expect(events.actions[0]._id).toEqual(2);
    })
})