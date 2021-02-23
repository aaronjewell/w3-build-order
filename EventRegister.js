export default function EventRegister() {
    this.events = [];
}

EventRegister.prototype.addEvent = function (tickEvent) {
    this.events[tickEvent.tick] = tickEvent;
}