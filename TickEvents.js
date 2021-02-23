export default function TickEvents(tick) {
    this.tick = tick;
    this.actions = [];
    this.resourceLoss = {};
    this.resourceGain = {};
}

TickEvents.prototype.resourceChange = function(definition, isGain = true) {
    const pool = isGain ? this.resourceGain : this.resourceLoss;

    for (const [key, value] of Object.entries(definition)) {
        if (key in pool) {
            if (Array.isArray(pool[key])) {
                pool[key].push(value);
            } else {
                pool[key] += value;
            }
        } else {
            pool[key] = value;
        }
    }
}

TickEvents.prototype.addAction = function(action) {
    this.actions.push(action);
}

TickEvents.prototype.loseResource = function(definition) {
    return this.resourceChange(definition, false);
}

TickEvents.prototype.gainResource = function(definition) {
    return this.resourceChange(definition);
}