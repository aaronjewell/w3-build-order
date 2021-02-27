export default function Action({ type, start, valid, duration, meta }) {
    this._id = Action._id++;
    this.type = type;
    this.start = start;
    this.valid = valid;
    this.duration = duration;
    this.meta = meta;
}

Action._id = 1;

Action.train = function(start, unitData, building) {
    return new Action({
        type: "train",
        start,
        duration: unitData.buildTime,
        valid: true,
        meta: { unit: unitData, building },
    });
}

Action.build = function(start, worker, buildingData) {
    return new Action({
        type: "build",
        start,
        duration: buildingData.buildTime,
        valid: true,
        meta: { worker, building: buildingData }
    });
}

Action.assignToGold = function(start, worker) {
    return new Action({
        type: "assignToGold",
        start,
        duration: 0,
        valid: true,
        meta: { worker }
    });
};

Action.assignToLumber = function(start, worker) {
    return new Action({
        type: "assignToLumber",
        start,
        duration: 0,
        valid: true,
        meta: { worker }
    });
};