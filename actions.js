export default function Action(name, started, duration, completedCB) {
    this.name = name
    this.started = started
    this.current = started;
    this.duration = duration
    this.completedCB = completedCB;
}

Action.prototype.tick = function() {
    this.current++;
    if (this.current > this.started + this.duration) {
        this.completedCB(this);
    }
}

