import EventRegister from "./EventRegister.js";
import TickEvent from "./TickEvents.js";

describe("EventRegister", () => {
    it("should add TickEvents to the correct index", () => {
        const register = new EventRegister();
        const event = new TickEvent(10);

        register.addEvent(event)

        expect(!!register.events[10]).toEqual(true);
        expect(!!register.events[0]).toEqual(false);
    });
})