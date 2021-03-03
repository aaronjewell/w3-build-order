import ResourceList from "./ResourceList";
import TickEvents from "./TickEvents";

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
    });

    it ("should do nothing if the id is not found", () => {
        const events = new TickEvents();
        events.actions = [{ _id: 1 }, { _id: 2 }];

        events.removeAction(3);

        expect(events.actions.length).toEqual(2);
        expect(events.actions[0]._id).toEqual(1);
    })
})