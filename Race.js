export default function Race() {}

Race.prototype.buildings = function() {
    return this.constructor.buildings || [];
}

Race.prototype.units = function() {
    return this.constructor.units || [];
}