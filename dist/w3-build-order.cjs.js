'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var clonedeep = require('lodash.clonedeep');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var clonedeep__default = /*#__PURE__*/_interopDefaultLegacy(clonedeep);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var buildings = [{
  id: "altarOfStorms",
  name: "Altar of Storms",
  type: "building",
  gold: 180,
  lumber: 50,
  buildTime: 60,
  supply: 0,
  dependsOn: [],
  order: 6,
  units: ["bladeMaster", "farSeer", "shadowHunter", "taurenChieftain"],
  upgrades: [],
  items: [],
  image: "orc/altarofstorms.png"
}, {
  id: "barracks",
  name: "Barracks",
  type: "building",
  gold: 180,
  lumber: 50,
  buildTime: 60,
  supply: 0,
  dependsOn: [],
  order: 2,
  units: ["grunt"],
  upgrades: ["trollRegeneration", "berserkerUpgrade", "burningOil"],
  items: [],
  image: "orc/barracks.png"
}, {
  id: "beastiary",
  name: "Beastiary",
  type: "building",
  gold: 145,
  lumber: 140,
  buildTime: 60,
  supply: 0,
  dependsOn: ["stronghold"],
  order: 8,
  units: [],
  upgrades: ["ensnare", "envenomedSpears", "liquidFire"],
  items: [],
  image: "orc/beastiary.png"
}, {
  id: "greatHall",
  name: "Great Hall",
  type: "building",
  gold: 385,
  lumber: 185,
  buildTime: 150,
  supply: 11,
  tier: 1,
  dependsOn: [],
  order: 1,
  units: ["peon"],
  upgrades: ["pillage", "unitInventory", "stronghold", "fortress"],
  items: [],
  image: "orc/greathall.png"
}, {
  id: "orcBurrow",
  name: "Orc Burrow",
  type: "building",
  gold: 160,
  lumber: 40,
  buildTime: 50,
  supply: 10,
  dependsOn: [],
  order: 5,
  units: [],
  upgrades: [],
  items: [],
  image: "orc/orcburrow.png"
}, {
  id: "spiritLodge",
  name: "Spirit Lodge",
  type: "building",
  gold: 150,
  lumber: 135,
  buildTime: 70,
  supply: 0,
  dependsOn: ["stronghold"],
  order: 7,
  units: [],
  upgrades: ["shamanAdeptTraining", "shamanMasterTraining", "witchDoctorAdeptTraining", "witchDoctorMasterTraining"],
  items: [],
  image: "orc/spiritlodge.png"
}, {
  id: "taurenTotem",
  name: "Tauren Totem",
  type: "building",
  gold: 135,
  lumber: 155,
  buildTime: 70,
  supply: 0,
  dependsOn: ["warMill", "fortress"],
  order: 9,
  units: [],
  upgrades: ["spiritWalkeAdeptTraining", "spiritWalkerMasterTraining", "pulverizeDamageIncrease"],
  items: [],
  image: "orc/taurentotem.png"
}, {
  id: "voodooLounge",
  name: "Voodoo Lounge",
  type: "building",
  gold: 130,
  lumber: 30,
  buildTime: 60,
  supply: 0,
  dependsOn: [],
  order: 10,
  units: [],
  upgrades: [],
  items: ["healingSalve", "lesserClarityPotion", "orbOfLightning", "potionOfHealing", "potionOfMana", "scrollOfSpeed", "scrollOfTownPortal", "tinyGreatHall"],
  image: "orc/voodoolounge.png"
}, {
  id: "warMill",
  name: "War Mill",
  type: "building",
  gold: 205,
  lumber: 0,
  buildTime: 70,
  supply: 0,
  dependsOn: [],
  order: 3,
  units: [],
  upgrades: ["spikedBarricades", "improvedSpikedBarricades", "reinforcedDefenses", "steelMeleeWeapons", "thoriumMeleeWeapons", "arcaniteMeleeWeapons", "steelRangedWeapons", "thoriumRangedWeapons", "arcaniteRangedWeapons"],
  items: [],
  image: "orc/warmill.png"
}, {
  id: "watchTower",
  name: "Watch Tower",
  type: "building",
  gold: 110,
  lumber: 80,
  buildTime: 60,
  supply: 0,
  dependsOn: ["warMill"],
  order: 4,
  units: [],
  upgrades: [],
  items: [],
  image: "orc/watchtower.png"
}];

var units = [{
  id: "peon",
  name: "Peon",
  type: "unit",
  gold: 75,
  lumber: 0,
  supply: 1,
  buildTime: 15,
  canHarvest: true,
  canMine: true,
  canBuild: true,
  order: 1,
  image: "orc/peon.png"
}, {
  id: "grunt",
  name: "Grunt",
  type: "unit",
  gold: 200,
  lumber: 0,
  supply: 3,
  buildTime: 30,
  order: 1,
  image: "orc/grunt.png"
}, {
  id: "headhunter",
  name: "Headhunter",
  type: "unit",
  gold: 135,
  lumber: 20,
  supply: 2,
  buildTime: 20,
  order: 2,
  image: "orc/headhunter.png"
}, {
  id: "demolisher",
  name: "Demolisher",
  type: "unit",
  gold: 220,
  lumber: 50,
  supply: 4,
  buildTime: 40,
  order: 3,
  image: "orc/demolisher.png"
}, {
  id: "shaman",
  name: "Shaman",
  type: "unit",
  gold: 130,
  lumber: 20,
  supply: 2,
  buildTime: 30,
  order: 1,
  image: "orc/shaman.png"
}, {
  id: "witchDoctor",
  name: "Witch Doctor",
  type: "unit",
  gold: 145,
  lumber: 25,
  supply: 2,
  buildTime: 30,
  order: 2,
  image: "orc/witchdoctor.png"
}, {
  id: "raider",
  name: "Raider",
  type: "unit",
  gold: 180,
  lumber: 40,
  supply: 3,
  buildTime: 28,
  order: 1,
  image: "orc/wolfrider.png"
}, {
  id: "kodoBeast",
  name: "Kodo Beast",
  type: "unit",
  gold: 255,
  lumber: 60,
  supply: 4,
  buildTime: 30,
  order: 3,
  image: "orc/kodobeast.png"
}, {
  id: "windRider",
  name: "Wind Rider",
  type: "unit",
  gold: 265,
  lumber: 40,
  supply: 4,
  buildTime: 35,
  order: 2,
  image: "orc/wyvernrider.png"
}, {
  id: "trollBatrider",
  name: "Troll Batrider",
  type: "unit",
  gold: 160,
  lumber: 40,
  supply: 2,
  buildTime: 28,
  orer: 4,
  image: "orc/batrider.png"
}, {
  id: "tauren",
  name: "Tauren",
  type: "unit",
  gold: 280,
  lumber: 80,
  supply: 5,
  buildTime: 44,
  order: 2,
  image: "orc/tauren.png"
}, {
  id: "bladeMaster",
  name: "Blade Master",
  type: "unit",
  gold: 425,
  lumber: 100,
  supply: 5,
  buildTime: 55,
  limit: 1,
  isHero: true,
  order: 9,
  image: "orc/blademaster.png"
}, {
  id: "farSeer",
  name: "Far Seer",
  type: "unit",
  gold: 425,
  lumber: 100,
  supply: 5,
  buildTime: 55,
  limit: 1,
  isHero: true,
  order: 10,
  image: "orc/farseer.png"
}, {
  id: "taurenChieftain",
  name: "Tuaren Chieftain",
  type: "unit",
  gold: 425,
  lumber: 100,
  supply: 5,
  buildTime: 55,
  limit: 1,
  isHero: true,
  order: 11,
  image: "orc/chieftain.png"
}, {
  id: "shadowHunter",
  name: "Shadow Hunter",
  type: "unit",
  gold: 425,
  lumber: 100,
  supply: 5,
  buildTime: 55,
  limit: 1,
  isHero: true,
  order: 5,
  image: "orc/shadowhunter.png"
}];

var Action = /*#__PURE__*/function () {
  function Action(_ref) {
    var type = _ref.type,
        start = _ref.start,
        valid = _ref.valid,
        duration = _ref.duration,
        meta = _ref.meta;

    _classCallCheck(this, Action);

    this._id = Action._id++;
    this.type = type;
    this.start = start;
    this.valid = valid;
    this.duration = duration;
    this.meta = meta;
  }

  _createClass(Action, null, [{
    key: "build",
    value: function build(start, buildingData, worker) {
      return new Action({
        type: "build",
        start: start,
        duration: buildingData.buildTime,
        valid: true,
        meta: {
          worker: worker,
          building: buildingData
        }
      });
    }
  }, {
    key: "buy",
    value: function buy(start, itemData, building) {
      return new Action({
        type: "buy",
        start: start,
        duration: 0,
        valid: true,
        meta: {
          building: building,
          item: itemData
        }
      });
    }
  }, {
    key: "train",
    value: function train(start, unitData, building) {
      return new Action({
        type: "train",
        start: start,
        duration: unitData.buildTime || 0,
        valid: true,
        meta: {
          unit: unitData,
          building: building
        }
      });
    }
  }, {
    key: "upgrade",
    value: function upgrade(start, upgradeData, building) {
      return new Action({
        type: "upgrade",
        start: start,
        duration: upgradeData.buildTime,
        valid: true,
        meta: {
          building: building,
          upgrade: upgradeData
        }
      });
    }
  }, {
    key: "assignToGold",
    value: function assignToGold(start, worker) {
      return new Action({
        type: "assignToGold",
        start: start,
        duration: 0,
        valid: true,
        meta: {
          worker: worker
        }
      });
    }
  }, {
    key: "removeFromGold",
    value: function removeFromGold(start, worker) {
      return new Action({
        type: "removeFromGold",
        start: start,
        duration: 0,
        valid: true,
        meta: {
          worker: worker
        }
      });
    }
  }, {
    key: "assignToLumber",
    value: function assignToLumber(start, worker) {
      return new Action({
        type: "assignToLumber",
        start: start,
        duration: 0,
        valid: true,
        meta: {
          worker: worker
        }
      });
    }
  }, {
    key: "removeFromLumber",
    value: function removeFromLumber(start, worker) {
      return new Action({
        type: "removeFromLumber",
        start: start,
        duration: 0,
        valid: true,
        meta: {
          worker: worker
        }
      });
    }
  }]);

  return Action;
}();

_defineProperty(Action, "_id", 1);

var Building = /*#__PURE__*/function () {
  function Building(_ref) {
    var id = _ref.id,
        name = _ref.name,
        gold = _ref.gold,
        lumber = _ref.lumber,
        buildTime = _ref.buildTime,
        dependsOn = _ref.dependsOn,
        supply = _ref.supply,
        type = _ref.type,
        units = _ref.units,
        upgrades = _ref.upgrades,
        items = _ref.items,
        image = _ref.image;

    _classCallCheck(this, Building);

    this._id = Building._id++;
    this.id = id;
    this.name = name;
    this.gold = gold;
    this.lumber = lumber;
    this.buildTime = buildTime;
    this.dependsOn = dependsOn;
    this.units = units;
    this.upgrades = upgrades;
    this.items = items;
    this.supply = supply;
    this.image = image;
    this.type = type;
  }

  _createClass(Building, null, [{
    key: "resetIds",
    value: function resetIds() {
      Building._id = 1;
    }
  }]);

  return Building;
}();

_defineProperty(Building, "_id", 1);

var Item = /*#__PURE__*/function () {
  function Item(_ref) {
    var id = _ref.id,
        name = _ref.name,
        gold = _ref.gold,
        lumber = _ref.lumber,
        dependsOn = _ref.dependsOn,
        order = _ref.order,
        type = _ref.type,
        image = _ref.image;

    _classCallCheck(this, Item);

    this._id = Item._id++;
    this.id = id;
    this.name = name;
    this.gold = gold;
    this.order = order, this.lumber = lumber;
    this.dependsOn = dependsOn;
    this.image = image;
    this.type = type;
  }

  _createClass(Item, null, [{
    key: "resetIds",
    value: function resetIds() {
      Item._id = 1;
    }
  }]);

  return Item;
}();

_defineProperty(Item, "_id", 1);

var ResourceList = /*#__PURE__*/function () {
  function ResourceList() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ResourceList);

    this.value = value;
  }

  _createClass(ResourceList, [{
    key: "addValues",
    value: function addValues(resources) {
      var resourceList = resources;

      if (!(resourceList instanceof ResourceList)) {
        resourceList = new ResourceList(resourceList);
      }

      for (var _i = 0, _Object$entries = Object.entries(resourceList.value); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (key in this.value) {
          if (Array.isArray(this.value[key])) {
            if (Array.isArray(value)) {
              this.value[key] = this.value[key].concat(value);
            } else {
              this.value[key].push(value);
            }
          } else {
            this.value[key] += value;
          }
        } else {
          this.value[key] = value;
        }
      }
    }
  }, {
    key: "removeValues",
    value: function removeValues(resources) {
      var _this = this;

      var resourceList = resources;

      if (!(resourceList instanceof ResourceList)) {
        resourceList = new ResourceList(resourceList);
      }

      var _loop = function _loop() {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        if (key in _this.value) {
          if (Array.isArray(_this.value[key])) {
            if (Array.isArray(value)) {
              var _iterator = _createForOfIteratorHelper(value),
                  _step;

              try {
                var _loop2 = function _loop2() {
                  var v = _step.value;

                  var index = _this.value[key].findIndex(function (i) {
                    return i._id === v._id;
                  });

                  _this.value[key].splice(index, 1);
                };

                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _loop2();
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            } else {
              var index = _this.value[key].findIndex(function (i) {
                return i._id === value._id;
              });

              _this.value[key].splice(index, 1);
            }
          } else {
            _this.value[key] -= value;
          }
        } else {
          throw new Error("Unable to lose resource, none accumulated.");
        }
      };

      for (var _i2 = 0, _Object$entries2 = Object.entries(resourceList.value); _i2 < _Object$entries2.length; _i2++) {
        _loop();
      }
    }
  }]);

  return ResourceList;
}();

var ResourceEvent = /*#__PURE__*/function () {
  function ResourceEvent(tick, actionId) {
    _classCallCheck(this, ResourceEvent);

    _defineProperty(this, "resourceLoss", new ResourceList());

    _defineProperty(this, "resourceGain", new ResourceList());

    this.actionId = actionId;
    this.tick = tick;
  }

  _createClass(ResourceEvent, [{
    key: "loseResources",
    value: function loseResources(resourceList) {
      var resources = resourceList;

      if (!(resourceList instanceof ResourceList)) {
        resources = new ResourceList(resources);
      }

      this.resourceLoss.addValues(resourceList);
    }
  }, {
    key: "gainResources",
    value: function gainResources(resourceList) {
      var resources = resourceList;

      if (!(resourceList instanceof ResourceList)) {
        resources = new ResourceList(resources);
      }

      this.resourceGain.addValues(resourceList);
    }
  }]);

  return ResourceEvent;
}();

var Unit = /*#__PURE__*/function () {
  function Unit(_ref) {
    var id = _ref.id,
        buildTime = _ref.buildTime,
        _ref$canBuild = _ref.canBuild,
        canBuild = _ref$canBuild === void 0 ? false : _ref$canBuild,
        _ref$canHarvest = _ref.canHarvest,
        canHarvest = _ref$canHarvest === void 0 ? false : _ref$canHarvest,
        _ref$canMine = _ref.canMine,
        canMine = _ref$canMine === void 0 ? false : _ref$canMine,
        image = _ref.image,
        _ref$isHero = _ref.isHero,
        isHero = _ref$isHero === void 0 ? false : _ref$isHero,
        order = _ref.order,
        gold = _ref.gold,
        lumber = _ref.lumber,
        name = _ref.name,
        supply = _ref.supply,
        type = _ref.type;

    _classCallCheck(this, Unit);

    this._id = Unit._id++;
    this.id = id;
    this.buildTime = buildTime;
    this.canBuild = canBuild;
    this.canHarvest = canHarvest;
    this.canMine = canMine;
    this.gold = gold;
    this.isHero = isHero;
    this.order = order;
    this.image = image;
    this.lumber = lumber;
    this.name = name;
    this.supply = supply;
    this.type = type;
  }

  _createClass(Unit, null, [{
    key: "resetIds",
    value: function resetIds() {
      Unit._id = 1;
    }
  }]);

  return Unit;
}();

_defineProperty(Unit, "_id", 1);

var Upgrade = function Upgrade(_ref) {
  var id = _ref.id,
      name = _ref.name,
      gold = _ref.gold,
      lumber = _ref.lumber,
      buildTime = _ref.buildTime,
      tier = _ref.tier,
      replaces = _ref.replaces,
      dependsOn = _ref.dependsOn,
      image = _ref.image;

  _classCallCheck(this, Upgrade);

  this.id = id;
  this.name = name;
  this.gold = gold;
  this.lumber = lumber;
  this.buildTime = buildTime;
  this.tier = tier;
  this.replaces = replaces;
  this.dependsOn = dependsOn;
  this.image = image;
};

var EventsProcessor = /*#__PURE__*/function () {
  function EventsProcessor() {
    _classCallCheck(this, EventsProcessor);
  }

  _createClass(EventsProcessor, [{
    key: "validateActions",
    value: function validateActions(actions, resourceList) {
      var accumulatedActions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var processedActions = [];

      var _iterator = _createForOfIteratorHelper(actions),
          _step;

      try {
        var _loop = function _loop() {
          var action = _step.value;
          action.valid = true;
          action.error = null;

          switch (action.type) {
            case "build":
              // Check for sufficient resources
              if (resourceList.value.gold < action.meta.building.gold || resourceList.value.lumber < action.meta.building.lumber) {
                action.valid = false;
                action.error = "not enough resources";
              } // Check if builder still exists


              if (!resourceList.value.units.find(function (u) {
                return u._id === action.meta.worker._id;
              })) {
                action.valid = false;
                action.error = "worker no longer exists";
              }

              break;

            case "buy":
              // Check for sufficient resources
              if (resourceList.value.gold < action.meta.item.gold || resourceList.value.lumber < action.meta.item.lumber) {
                action.valid = false;
                action.error = "not enough resources";
              } // Check if shop still exists


              if (!resourceList.value.buildings.find(function (b) {
                return b._id === action.meta.building._id;
              })) {
                action.valid = false;
                action.error = "shop no longer exists";
              } // Check that we have the dependencies


              if (typeof action.meta.item.dependsOn !== "undefined" && !action.meta.item.dependsOn.every(function (dependency) {
                return resourceList.value.upgrades.some(function (completed) {
                  return completed.id === dependency;
                });
              })) {
                action.valid = false;
                action.error = "missing required upgrade";
              } // Check that we haven't exceeded replenishment


              if ([].concat(_toConsumableArray(accumulatedActions), processedActions).filter(function (a) {
                return a.type === "buy" && a.meta.item.id === action.meta.item.id && action.start - a.start < action.meta.item.replenish;
              }).length >= action.meta.item.max) {
                action.valid = false;
                action.error = "exceeded item replenishment";
              }

              break;

            case "train":
              if (resourceList.value.gold < action.meta.unit.gold || resourceList.value.lumber < action.meta.unit.lumber || resourceList.value.supply < action.meta.unit.supply) {
                action.valid = false;
                action.error = "not enough resources";
              }

              if (action.meta.unit.type !== "neutralUnit" && !resourceList.value.buildings.find(function (b) {
                return b._id === action.meta.building._id && b.id === action.meta.building.id;
              })) {
                action.valid = false;
                action.error = "building no longer available for training";
              }

              if (action.meta.unit.type !== "neutralUnit" && processedActions.filter(function (a) {
                return a.type === "train" && a.meta.building._id === action.meta.building._id && a.start + a.duration >= action.start && a.start + a.duration <= action.start + action.duration;
              }).length) {
                action.valid = false;
                action.error = "building is busy training";
              }

              if (action.meta.unit.limit && action.meta.unit.limit <= processedActions.filter(function (a) {
                return a.type === "train" && a.meta.unit.id === action.meta.unit.id;
              }).length) {
                action.valid = false;
                action.error = "too many of this unit produced";
              } // Check that we haven't exceeded replenishment


              if ([].concat(_toConsumableArray(accumulatedActions), processedActions).filter(function (a) {
                return a.type === "train" && a.meta.unit.id === action.meta.unit.id && action.start - a.start < action.meta.unit.replenish;
              }).length >= action.meta.unit.max) {
                action.valid = false;
                action.error = "exceeded unit replenishment";
              }

              if (action.meta.unit.availability && action.meta.unit.limit < a.start) {
                action.valid = false;
                action.error = "unit being produced before available";
              }

              break;

            case "assignToGold":
              if (!resourceList.value.units.find(function (u) {
                return u._id === action.meta.worker._id && u.id === action.meta.worker.id;
              })) {
                action.valid = false;
                action.error = "worker no longer available for mining";
              }

              break;

            case "removeFromGold":
              if (!resourceList.value.miningWorkers.find(function (u) {
                return u._id === action.meta.worker._id && u.id === action.meta.worker.id;
              })) {
                action.valid = false;
                action.error = "worker no longer mining at this time";
              }

              break;

            case "assignToLumber":
              if (!resourceList.value.units.find(function (u) {
                return u._id === action.meta.worker._id && u.id === action.meta.worker.id;
              })) {
                action.valid = false;
                action.error = "worker no longer available for harvesting";
              }

              break;

            case "removeFromLumber":
              if (!resourceList.value.harvestingWorkers.find(function (u) {
                return u._id === action.meta.worker._id && u.id === action.meta.worker.id;
              })) {
                action.valid = false;
                action.error = "worker no longer harvesting at this time";
              }

              break;

            case "upgrade":
              if (resourceList.value.gold < action.meta.upgrade.gold || resourceList.value.lumber < action.meta.upgrade.lumber) {
                action.valid = false;
                action.error = "not enough resources for upgrade";
              }

              if (!action.meta.upgrade.dependsOn.buildings.every(function (dependency) {
                return resourceList.value.buildings.some(function (completed) {
                  return completed.id === dependency;
                });
              }) || !action.meta.upgrade.dependsOn.upgrades.every(function (dependency) {
                return resourceList.value.upgrades.some(function (completed) {
                  return completed.id === dependency;
                });
              })) {
                action.valid = false;
                action.error = "missing required building or upgrade";
              }

              if (!!resourceList.value.upgrades.find(function (u) {
                return u.id === action.meta.upgrade.id;
              })) {
                action.valid = false;
                action.error = "upgrade already researched";
              }

              if (action.meta.upgrade.replaces && !resourceList.value.upgrades.find(function (u) {
                return u.id === action.meta.upgrade.replaces;
              })) {
                action.valid = false;
                action.error = "missing earlier version of upgrade";
              }

          }

          processedActions.push(action);
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "processAction",
    value: function processAction(action) {
      var _immediateLoss$loseRe;

      var resourceEvents = [];

      switch (action.type) {
        case "build":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources({
            gold: action.meta.building.gold,
            lumber: action.meta.building.lumber,
            units: [action.meta.worker]
          });
          var futureGain = new ResourceEvent(action.start + action.duration, action._id);
          futureGain.gainResources({
            supply: action.meta.building.supply,
            buildings: [new Building(action.meta.building)],
            units: [action.meta.worker]
          });
          resourceEvents.push(immediateLoss, futureGain);
          break;

        case "buy":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources({
            gold: action.meta.item.gold,
            lumber: action.meta.item.lumber || 0 // Neutral items do not cost lumber

          });
          var immediateGain = new ResourceEvent(action.start + action.duration, action._id);
          immediateGain.gainResources({
            items: [new Item(action.meta.item)]
          });
          resourceEvents.push(immediateLoss, immediateGain);
          break;

        case "train":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources((_immediateLoss$loseRe = {
            supply: action.meta.unit.supply,
            gold: action.meta.unit.gold,
            lumber: action.meta.unit.lumber
          }, _defineProperty(_immediateLoss$loseRe, "supply", action.meta.unit.supply), _defineProperty(_immediateLoss$loseRe, "buildings", [action.meta.building]), _immediateLoss$loseRe));
          var futureGain = new ResourceEvent(action.start + action.duration, action._id);
          futureGain.gainResources({
            units: [new Unit(action.meta.unit)],
            buildings: [action.meta.building]
          });
          resourceEvents.push(immediateLoss, futureGain);
          break;

        case "assignToGold":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources({
            units: [action.meta.worker]
          });
          var immediateGain = new ResourceEvent(action.start, action._id);
          immediateGain.gainResources({
            miningWorkers: [action.meta.worker]
          });
          resourceEvents.push(immediateGain, immediateLoss);
          break;

        case "removeFromGold":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources({
            miningWorkers: [action.meta.worker]
          });
          var immediateGain = new ResourceEvent(action.start, action._id);
          immediateGain.gainResources({
            units: [action.meta.worker]
          });
          resourceEvents.push(immediateGain, immediateLoss);
          break;

        case "assignToLumber":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources({
            units: [action.meta.worker]
          });
          var immediateGain = new ResourceEvent(action.start, action._id);
          immediateGain.gainResources({
            harvestingWorkers: [action.meta.worker]
          });
          resourceEvents.push(immediateGain, immediateLoss);
          break;

        case "removeFromLumber":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources({
            harvestingWorkers: [action.meta.worker]
          });
          var immediateGain = new ResourceEvent(action.start, action._id);
          immediateGain.gainResources({
            units: [action.meta.worker]
          });
          resourceEvents.push(immediateGain, immediateLoss);
          break;

        case "upgrade":
          var immediateLoss = new ResourceEvent(action.start, action._id);
          immediateLoss.loseResources({
            buildings: [action.meta.building],
            gold: action.meta.upgrade.gold,
            lumber: action.meta.upgrade.lumber
          });
          var futureGain = new ResourceEvent(action.start + action.duration, action._id);
          futureGain.gainResources({
            upgrades: [new Upgrade(action.meta.upgrade)],
            buildings: [action.meta.building]
          });
          resourceEvents.push(immediateLoss, futureGain);
          break;
      }

      return resourceEvents;
    }
  }]);

  return EventsProcessor;
}();

var TickEvents = /*#__PURE__*/function () {
  function TickEvents(tick) {
    _classCallCheck(this, TickEvents);

    _defineProperty(this, "actions", []);

    this.tick = tick;
  }

  _createClass(TickEvents, [{
    key: "addAction",
    value: function addAction(action) {
      this.actions.push(action);
    }
  }, {
    key: "removeAction",
    value: function removeAction(id) {
      var index = this.actions.findIndex(function (a) {
        return a._id === id;
      });

      if (index >= 0) {
        this.actions.splice(index, 1);
      }
    }
  }]);

  return TickEvents;
}();

var EventRegister = /*#__PURE__*/function () {
  function EventRegister(startingResources) {
    _classCallCheck(this, EventRegister);

    _defineProperty(this, "eventsProcessor", new EventsProcessor());

    _defineProperty(this, "eventsIndices", []);

    _defineProperty(this, "events", {});

    this.startingResources = startingResources;
    this.resetEvents();
  }

  _createClass(EventRegister, [{
    key: "eventsAt",
    value: function eventsAt(tick) {
      var indexLocation = this.eventsIndices.indexOf(tick);

      if (indexLocation < 0) {
        this.events[tick] = new TickEvents(tick);
        this.eventsIndices.push(tick);
        this.eventsIndices.sort(function (a, b) {
          return a - b;
        });
      }

      return this.events[tick];
    }
  }, {
    key: "resourceEventsAt",
    value: function resourceEventsAt(tick) {
      var indexLocation = this.resourceEventsIndices.indexOf(tick);

      if (indexLocation < 0) {
        this.resourceEvents[tick] = [];
        this.resourceEventsIndices.push(tick);
        this.resourceEventsIndices.sort(function (a, b) {
          return a - b;
        }); // Make an event so we stop for resource calculation

        this.eventsAt(tick);
      }

      return this.resourceEvents[tick];
    }
  }, {
    key: "resetEvents",
    value: function resetEvents() {
      this.resourceEventsIndices = [];
      this.resourceEvents = {};
      var toRemove = [];

      var _iterator = _createForOfIteratorHelper(this.eventsIndices),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var index = _step.value;

          if (!this.events[index].actions.length) {
            toRemove.push(index);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.eventsIndices = this.eventsIndices.filter(function (ei) {
        return toRemove.indexOf(ei) === -1;
      });

      for (var _i = 0, _toRemove = toRemove; _i < _toRemove.length; _i++) {
        var removeIndex = _toRemove[_i];
        delete this.resourceEvents[removeIndex];
      }

      var initialResourceEvent = new ResourceEvent(0, null);
      var startingGain = clonedeep__default['default'](this.startingResources.value);
      Building.resetIds();
      Item.resetIds();
      Unit.resetIds();
      startingGain.units.map(function (u) {
        return new Unit(u);
      });
      startingGain.buildings.map(function (u) {
        return new Building(u);
      });
      initialResourceEvent.gainResources(startingGain);
      initialResourceEvent.loseResources({
        supply: 5
      });
      this.addResourceEvent(initialResourceEvent);
    }
  }, {
    key: "forEachEvent",
    value: function forEachEvent(cb) {
      for (var i = 0; i < this.eventsIndices.length; i++) {
        var index = this.eventsIndices[i];
        cb(this.events[index], index);
      }
    }
  }, {
    key: "addAction",
    value: function addAction(action) {
      this.eventsAt(action.start).addAction(action);
    }
  }, {
    key: "removeAction",
    value: function removeAction(tick, id) {
      this.eventsAt(tick).removeAction(id);
    }
  }, {
    key: "addResourceEvent",
    value: function addResourceEvent(resourceEvent) {
      this.resourceEventsAt(resourceEvent.tick).push(resourceEvent);
    }
  }]);

  return EventRegister;
}();

var ActionManager = /*#__PURE__*/function () {
  function ActionManager(race, resourcesManager) {
    _classCallCheck(this, ActionManager);

    _defineProperty(this, "eventsProcessor", new EventsProcessor());

    this.eventsRegister = new EventRegister(race.startingResources);
    this.resourcesManager = resourcesManager;
    this.processEvents();
  }

  _createClass(ActionManager, [{
    key: "addAction",
    value: function addAction(action) {
      // Add the action event to the registry
      this.eventsRegister.addAction(action); // Reset our accumulated resources

      this.resourcesManager.reset(); // Reset previous resource events

      this.eventsRegister.resetEvents();
      this.processEvents();
    }
  }, {
    key: "processEvents",
    value: function processEvents() {
      var _this = this;

      var accumulatedActions = [];
      this.eventsRegister.forEachEvent(function (event, index) {
        // Sum up resource events added by previous actions.
        var gains = _this.eventsRegister.resourceEventsAt(event.tick).flatMap(function (re) {
          return re.resourceGain;
        });

        var losses = _this.eventsRegister.resourceEventsAt(event.tick).flatMap(function (re) {
          return re.resourceLoss;
        }); // Get starting resources


        var resourcesForTick = new ResourceList(_this.resourcesManager.resourcesAt(event.tick)); // Add in all the new gains

        var _iterator = _createForOfIteratorHelper(gains),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var gain = _step.value;
            resourcesForTick.addValues(gain);
          } // Subtract any losses

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper(losses),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var loss = _step2.value;
            resourcesForTick.removeValues(loss);
          } // Set validity of existing actions

        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        _this.eventsProcessor.validateActions(event.actions, resourcesForTick, accumulatedActions); // Process actions to get new resource events.


        var _iterator3 = _createForOfIteratorHelper(event.actions),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var eventAction = _step3.value;

            if (eventAction.valid) {
              var resourceEvents = _this.eventsProcessor.processAction(eventAction);

              var _iterator4 = _createForOfIteratorHelper(resourceEvents),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var re = _step4.value;

                  if (re.tick === event.tick) {
                    resourcesForTick.addValues(re.resourceGain);
                    resourcesForTick.removeValues(re.resourceLoss);
                  } else {
                    _this.eventsRegister.addResourceEvent(re);
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          } // Save the resources value for this tick

        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        _this.resourcesManager.setResources(event.tick, resourcesForTick); // Accumulate past actions for next event


        accumulatedActions = accumulatedActions.concat(event.actions);
      });
    }
  }, {
    key: "removeAction",
    value: function removeAction(action) {
      // Remove the action from the registery
      this.eventsRegister.removeAction(action.start, action._id); // Reset our accumulated resources

      this.resourcesManager.reset(); // Reset previous resource events

      this.eventsRegister.resetEvents();
      this.processEvents();
    }
  }, {
    key: "build",
    value: function build(tick, buildingData, worker) {
      this.addAction(Action.build(tick, buildingData, worker));
    }
  }, {
    key: "buy",
    value: function buy(tick, itemData, building) {
      this.addAction(Action.buy(tick, itemData, building));
    }
  }, {
    key: "train",
    value: function train(tick, unitData, building) {
      this.addAction(Action.train(tick, unitData, building));
    }
  }, {
    key: "upgrade",
    value: function upgrade(tick, upgradeData, building) {
      this.addAction(Action.upgrade(tick, upgradeData, building));
    }
  }, {
    key: "assignToGold",
    value: function assignToGold(tick, worker) {
      this.addAction(Action.assignToGold(tick, worker));
    }
  }, {
    key: "removeFromGold",
    value: function removeFromGold(tick, miner) {
      this.addAction(Action.removeFromGold(tick, miner));
    }
  }, {
    key: "assignToLumber",
    value: function assignToLumber(tick, worker) {
      this.addAction(Action.assignToLumber(tick, worker));
    }
  }, {
    key: "removeFromLumber",
    value: function removeFromLumber(tick, harvester) {
      this.addAction(Action.removeFromLumber(tick, harvester));
    }
  }, {
    key: "getActions",
    value: function getActions() {
      var actions = [];
      this.eventsRegister.forEachEvent(function (e) {
        return actions.push.apply(actions, _toConsumableArray(e.actions));
      });
      return actions;
    }
  }]);

  return ActionManager;
}();

var neutralBuildings = [{
  id: "goblinMerchant",
  name: "Goblin Merchant",
  type: "building",
  units: [],
  items: ["circletOfNobility", "periaptOfVitality", "bootsOfSpeed", "dustOfAppearance", "scrollOfHealing", "scrollOfProtection", "scrollOfTownPortalNeutral", "potionOfInvisibility", "tomeOfRetraining", "staffOfTeleportation", "potionOfLesserInvulnerability"],
  image: "neutral/goblinmerchant.png"
}, {
  id: "goblinLaboratory",
  name: "Goblin Laboratory",
  type: "building",
  units: ["goblinSapper", "goblinZeppelin", "goblinShredder"],
  items: [],
  image: "neutral/goblinlaboratory.png"
}, {
  id: "tavern",
  name: "Tavern",
  type: "building",
  units: ["nagaSeaWitch", "darkRanger", "pandarenBrewmaster", "firelord", "beastmaster", "pitLord", "goblinTinker", "goblinAlchemist"],
  items: [],
  image: "neutral/tavern.png"
}, {
  id: "mercenaryCamp",
  name: "Mercenary Camp",
  type: "building",
  units: ["forestTrollShadowPriest", "forestTrollBerserker", "mudGolem", "ogreMauler"],
  items: [],
  image: "neutral/mercenarycamp.png"
}];

var neutralUnits = [{
  id: "goblinSapper",
  name: "Goblin Sapper",
  type: "neutralUnit",
  isHero: false,
  gold: 215,
  lumber: 100,
  supply: 2,
  order: 1,
  max: 3,
  replenish: 45,
  availability: 440,
  image: "neutral/goblinsapper.gif"
}, {
  id: "goblinZeppelin",
  name: "Goblin Zeppelin",
  type: "neutralUnit",
  isHero: false,
  gold: 240,
  lumber: 60,
  supply: 0,
  order: 2,
  max: 1,
  replenish: 30,
  availability: 440,
  image: "neutral/goblinzeppelin.gif"
}, {
  id: "goblinShredder",
  name: "Goblin Shredder",
  type: "neutralUnit",
  isHero: false,
  gold: 375,
  lumber: 100,
  supply: 4,
  order: 3,
  max: 3,
  replenish: 80,
  availability: 300,
  image: "neutral/goblinshredder.gif"
}, {
  id: "nagaSeaWitch",
  name: "Naga Sea Witch",
  type: "neutralUnit",
  isHero: true,
  gold: 375,
  lumber: 135,
  supply: 5,
  order: 1,
  max: 1,
  replenish: 0,
  availability: 135,
  image: "neutral/nagaseawitch.gif"
}, {
  id: "darkRanger",
  name: "Dark Ranger",
  type: "neutralUnit",
  isHero: true,
  gold: 425,
  lumber: 135,
  supply: 5,
  order: 2,
  max: 1,
  replenish: 0,
  availability: 135,
  image: "neutral/darkranger.gif"
}, {
  id: "pandarenBrewmaster",
  name: "Pandaren Brewmaster",
  type: "neutralUnit",
  isHero: true,
  gold: 425,
  lumber: 135,
  supply: 5,
  order: 3,
  max: 1,
  replenish: 0,
  availability: 135,
  image: "neutral/pandarenbrewmaster.gif"
}, {
  id: "firelord",
  name: "Firelord",
  type: "neutralUnit",
  isHero: true,
  gold: 425,
  lumber: 135,
  supply: 5,
  order: 4,
  max: 1,
  availability: 135,
  image: "neutral/firelord.jpg"
}, {
  id: "beastmaster",
  name: "Beastmaster",
  type: "neutralUnit",
  isHero: true,
  gold: 425,
  lumber: 135,
  supply: 5,
  order: 6,
  max: 1,
  availability: 135,
  image: "neutral/beastmaster.gif"
}, {
  id: "pitLord",
  name: "Pit Lord",
  type: "neutralUnit",
  isHero: true,
  gold: 425,
  lumber: 135,
  supply: 5,
  order: 5,
  max: 1,
  availability: 135,
  image: "neutral/pitlord.gif"
}, {
  id: "goblinTinker",
  name: "Goblin Tinker",
  type: "neutralUnit",
  isHero: true,
  gold: 425,
  lumber: 135,
  supply: 5,
  order: 7,
  max: 1,
  availability: 135,
  image: "neutral/goblintinker.gif"
}, {
  id: "goblinAlchemist",
  name: "Goblin Alchemist",
  type: "neutralUnit",
  isHero: true,
  gold: 425,
  lumber: 135,
  supply: 5,
  order: 8,
  max: 1,
  availability: 135,
  image: "neutral/goblinalchemist.gif"
}, {
  id: "forestTrollShadowPriest",
  name: "Forest Troll Shadow Priest",
  type: "neutralUnit",
  isHero: false,
  gold: 195,
  lumber: 10,
  supply: 2,
  order: 1,
  replenish: 110,
  max: 1,
  availability: 120,
  image: "neutral/foresttrollshadowpriest.gif"
}, {
  id: "forestTrollBerserker",
  name: "Forest Troll Berserker",
  type: "neutralUnit",
  isHero: false,
  gold: 245,
  lumber: 30,
  supply: 3,
  order: 2,
  replenish: 210,
  max: 1,
  availability: 220,
  image: "neutral/foresttrollberserker.gif"
}, {
  id: "mudGolem",
  name: "Mud Golem",
  type: "neutralUnit",
  isHero: false,
  gold: 145,
  lumber: 10,
  supply: 2,
  order: 3,
  replenish: 110,
  max: 1,
  availability: 440,
  image: "neutral/mudgolem.gif"
}, {
  id: "ogreMauler",
  name: "Ogre Mauler",
  type: "neutralUnit",
  isHero: false,
  gold: 300,
  lumber: 0,
  supply: 3,
  order: 4,
  replenish: 160,
  max: 1,
  availability: 440,
  image: "neutral/ogremauler.gif"
}];

var neutralItems = [{
  id: "circletOfNobility",
  name: "Circlet of Nobility",
  type: "item",
  gold: 175,
  order: 3,
  max: 1,
  replenish: 90,
  availability: 0,
  image: "neutral/circletofnobility.gif"
}, {
  id: "periaptOfVitality",
  name: "Periapt of Vitality",
  type: "item",
  gold: 350,
  order: 2,
  max: 1,
  replenish: 120,
  availability: 0,
  image: "neutral/periaptofvitality.gif"
}, {
  id: "bootsOfSpeed",
  name: "Boots of Speed",
  type: "item",
  gold: 250,
  order: 1,
  max: 1,
  replenish: 220,
  availability: 0,
  image: "neutral/bootsofspeed.gif"
}, {
  id: "dustOfAppearance",
  name: "Dust of Appearance",
  type: "item",
  gold: 75,
  order: 4,
  max: 1,
  replenish: 60,
  availability: 0,
  image: "neutral/dustofappearance.gif"
}, {
  id: "scrollOfHealing",
  name: "Scroll of Healing",
  type: "item",
  gold: 250,
  order: 10,
  max: 2,
  replenish: 120,
  availability: 440,
  image: "neutral/scrollofhealing.gif"
}, {
  id: "scrollOfProtection",
  name: "Scroll of Protection",
  type: "item",
  gold: 150,
  order: 5,
  max: 2,
  replenish: 120,
  availability: 440,
  image: "neutral/scrollofprotection.gif"
}, {
  id: "scrollOfTownPortalNeutral",
  name: "Scroll of Town Portal",
  type: "item",
  gold: 350,
  order: 7,
  max: 2,
  replenish: 120,
  availability: 440,
  image: "neutral/scrolloftownportal.gif"
}, {
  id: "potionOfInvisibility",
  name: "Potion of Invisibility",
  type: "item",
  gold: 100,
  order: 6,
  max: 1,
  replenish: 120,
  availability: 440,
  image: "neutral/potionofinvisibility.gif"
}, {
  id: "tomeOfRetraining",
  name: "Tome of Retraining",
  type: "item",
  gold: 300,
  order: 9,
  max: 1,
  replenish: 120,
  availability: 440,
  image: "neutral/tomeofretraining.gif"
}, {
  id: "staffOfTeleportation",
  name: "Staff of Teleportation",
  type: "item",
  gold: 150,
  order: 8,
  max: 1,
  replenish: 120,
  availability: 220,
  image: "neutral/staffofteleportation.gif"
}, {
  id: "potionOfLesserInvulnerability",
  name: "Potion of Lesser Invulnerability",
  type: "item",
  gold: 150,
  order: 11,
  max: 1,
  replenish: 120,
  availability: 440,
  image: "neutral/potionoflesserinvulnerability.gif"
}];

var NeutralBuilding = function NeutralBuilding(_ref) {
  var id = _ref.id,
      name = _ref.name,
      type = _ref.type,
      units = _ref.units,
      items = _ref.items,
      image = _ref.image;

  _classCallCheck(this, NeutralBuilding);

  this._id = NeutralBuilding._id++;
  this.id = id;
  this.name = name;
  this.units = units;
  this.items = items;
  this.image = image;
  this.type = type;
};

_defineProperty(NeutralBuilding, "_id", 1);

var BuildingManager = /*#__PURE__*/function () {
  function BuildingManager(race) {
    _classCallCheck(this, BuildingManager);

    this.race = race;
  }

  _createClass(BuildingManager, [{
    key: "allItems",
    value: function allItems(building) {
      var _this = this;

      return building.items.map(function (id) {
        return [].concat(_toConsumableArray(_this.race.items), _toConsumableArray(neutralItems)).find(function (item) {
          return item.id === id;
        });
      });
    }
  }, {
    key: "allUnits",
    value: function allUnits(building) {
      var _this2 = this;

      return building.units.map(function (id) {
        return _this2.race.units.find(function (unit) {
          return unit.id === id;
        }) || neutralUnits.find(function (unit) {
          return unit.id === id;
        });
      });
    }
  }, {
    key: "allUpgrades",
    value: function allUpgrades(building) {
      var _this3 = this;

      // Neutral buildings do have upgrades.
      if (typeof building.upgrades === "undefined") return [];
      return building.upgrades.map(function (id) {
        return _this3.race.upgrades.find(function (upgrade) {
          return upgrade.id === id;
        });
      });
    }
  }, {
    key: "allBuildings",
    value: function allBuildings() {
      return this.race.buildings;
    }
  }, {
    key: "neutralBuildings",
    value: function neutralBuildings() {
      return this.race.neutralBuildings;
    }
  }, {
    key: "availableItems",
    value: function availableItems(building, tick, _ref) {
      var upgrades = _ref.upgrades,
          gold = _ref.gold,
          lumber = _ref.lumber;
      return this.allItems(building).filter(function (i) {
        return i.gold <= gold && (!i.lumber || i.lumber <= lumber);
      }).filter(function (i) {
        return (!i.availability || tick >= i.availability) && (!i.dependsOn || i.dependsOn.every(function (dependency) {
          return upgrades.some(function (completed) {
            return completed.id === dependency;
          });
        }));
      });
    }
  }, {
    key: "availableBuildings",
    value: function availableBuildings(_ref2) {
      var buildings = _ref2.buildings,
          gold = _ref2.gold,
          lumber = _ref2.lumber;
      return this.race.buildings.filter(function (b) {
        return b.dependsOn.every(function (dependency) {
          return buildings.some(function (completed) {
            return completed.id === dependency;
          });
        });
      }).filter(function (b) {
        return b.gold <= gold && b.lumber <= lumber;
      });
    }
  }, {
    key: "availableUnits",
    value: function availableUnits(building, tick, _ref3) {
      var _ref3$units = _ref3.units,
          units = _ref3$units === void 0 ? [] : _ref3$units,
          _ref3$upgrades = _ref3.upgrades,
          upgrades = _ref3$upgrades === void 0 ? [] : _ref3$upgrades;
          _ref3.buildings;
          var gold = _ref3.gold,
          lumber = _ref3.lumber,
          supply = _ref3.supply;
      var heroCount = units.filter(function (u) {
        return u.isHero;
      }).length;
      var tier = upgrades.reduce(function (highestTier, upgrade) {
        return Math.max(highestTier, upgrade.tier || 1);
      }, 1);
      return this.allUnits(building).filter(function (u) {
        return u.gold <= gold && u.lumber <= lumber && u.supply <= supply;
      }).filter(function (u) {
        return !u.availability || tick >= u.availability;
      }).filter(function (u) {
        return !(u.isHero && heroCount === tier) || !u.isHero;
      });
    }
  }, {
    key: "availableUpgrades",
    value: function availableUpgrades(building, _ref4) {
      var _ref4$buildings = _ref4.buildings,
          buildings = _ref4$buildings === void 0 ? [] : _ref4$buildings,
          _ref4$upgrades = _ref4.upgrades,
          upgrades = _ref4$upgrades === void 0 ? [] : _ref4$upgrades,
          gold = _ref4.gold,
          lumber = _ref4.lumber;
      return this.allUpgrades(building) // Have enough gold and lumber
      .filter(function (u) {
        return u.gold <= gold && u.lumber <= lumber;
      }) // Each building and upgrade dependency is met
      .filter(function (u) {
        return u.dependsOn.buildings.every(function (dependency) {
          return buildings.some(function (completed) {
            return completed.id === dependency;
          });
        }) && u.dependsOn.upgrades.every(function (dependency) {
          return upgrades.some(function (completed) {
            return completed.id === dependency;
          });
        });
      }) // Not already researched
      .filter(function (u) {
        return !upgrades.find(function (upgrade) {
          return upgrade.id === u.id;
        });
      }) // Doesn't replace anything or the upgrade it replaces is researched
      .filter(function (u) {
        return !u.replaces || upgrades.find(function (upgrade) {
          return u.replaces === upgrade.id;
        });
      });
    }
  }]);

  return BuildingManager;
}();

var Race = /*#__PURE__*/function () {
  function Race() {
    _classCallCheck(this, Race);
  }

  _createClass(Race, [{
    key: "buildings",
    value: function buildings() {
      return this.constructor.buildings || [];
    }
  }, {
    key: "items",
    value: function items() {
      return this.constructor.items || [];
    }
  }, {
    key: "units",
    value: function units() {
      return this.constructor.units || [];
    }
  }, {
    key: "upgrades",
    value: function upgrades() {
      return this.constructor.upgrades || [];
    }
  }]);

  return Race;
}();

_defineProperty(Race, "neutralBuildings", neutralBuildings);

var items = [{
  id: "healingSalve",
  name: "Healing Salve",
  type: "item",
  gold: 100,
  lumber: 0,
  max: 2,
  replenish: 60,
  dependsOn: [],
  order: 1,
  image: "orc/healingsalve.png"
}, {
  id: "lesserClarityPotion",
  name: "Lesser Clarity Potion",
  type: "item",
  gold: 70,
  lumber: 0,
  max: 2,
  replenish: 30,
  dependsOn: [],
  ordeR: 2,
  image: "orc/lesserclaritypotion.png"
}, {
  id: "orbOfLightning",
  name: "Orb of Lightning",
  type: "item",
  gold: 375,
  lumber: 0,
  max: 1,
  replenish: 120,
  dependsOn: ["fortress"],
  order: 9,
  image: "orc/orboflightning.png"
}, {
  id: "potionOfHealing",
  name: "Potion of Healing",
  type: "item",
  gold: 150,
  lumber: 0,
  max: 3,
  replenish: 120,
  dependsOn: ["stronghold"],
  order: 5,
  image: "orc/potionofhealing.png"
}, {
  id: "potionOfMana",
  name: "Potion of Mana",
  type: "item",
  gold: 150,
  lumber: 0,
  max: 2,
  replenish: 120,
  dependsOn: ["stronghold"],
  order: 6,
  image: "orc/potionofmana.png"
}, {
  id: "scrollOfSpeed",
  name: "Scroll of Speed",
  type: "item",
  gold: 50,
  lumber: 0,
  max: 1,
  replenish: 60,
  dependsOn: [],
  order: 3,
  image: "orc/scrollofspeed.png"
}, {
  id: "scrollOfTownPortal",
  name: "Scroll of Town Portal",
  type: "item",
  gold: 350,
  lumber: 0,
  max: 2,
  replenish: 120,
  dependsOn: ["stronghold"],
  order: 7,
  image: "orc/scrolloftownportal.png"
}, {
  id: "tinyGreatHall",
  name: "Tiny Great Hall",
  type: "item",
  gold: 600,
  lumber: 185,
  max: 1,
  replenish: 120,
  dependsOn: ["fortress"],
  order: 10,
  image: "orc/greathall.png"
}];

var upgrades = [{
  id: "stronghold",
  name: "Stronghold",
  type: "upgrade",
  gold: 700,
  lumber: 375,
  buildTime: 140,
  tier: 2,
  dependsOn: {
    buildings: ["greatHall"],
    upgrades: []
  },
  order: 9,
  image: "orc/stronghold.png"
}, {
  id: "fortress",
  name: "Fortress",
  type: "upgrade",
  gold: 1025,
  lumber: 565,
  buildTime: 140,
  tier: 3,
  replaces: "stronghold",
  dependsOn: {
    buildings: ["greatHall"],
    upgrades: []
  },
  order: 9,
  image: "orc/fortress.png"
}, {
  id: "spikedBarricades",
  name: "Spiked Barricades",
  type: "upgrade",
  gold: 25,
  lumber: 75,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 11,
  image: "orc/spikedbarricades.png"
}, {
  id: "improvedSpikedBarricades",
  name: "Improved Spiked Barricades",
  type: "upgrade",
  gold: 50,
  lumber: 100,
  buildTime: 60,
  replaces: "spikedBarricades",
  dependsOn: {
    buildings: [],
    upgrades: ["stronghold"]
  },
  order: 11,
  image: "orc/improvedspikedbarricades.png"
}, {
  id: "reinforcedDefenses",
  name: "Reinforced Defenses",
  type: "upgrade",
  gold: 75,
  lumber: 175,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: ["stronghold"]
  },
  order: 7,
  image: "orc/reinforceddefenses.png"
}, {
  id: "steelMeleeWeapons",
  name: "Steel Melee Weapons",
  type: "upgrade",
  gold: 100,
  lumber: 75,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 1,
  image: "orc/steelmeleeweapons.png"
}, {
  id: "thoriumMeleeWeapons",
  name: "Thorium Melee Weapons",
  type: "upgrade",
  gold: 150,
  lumber: 175,
  buildTime: 75,
  replaces: "steelMeleeWeapons",
  dependsOn: {
    buildings: [],
    upgrades: ["stronghold"]
  },
  order: 1,
  image: "orc/thoriummeleeweapons.png"
}, {
  id: "arcaniteMeleeWeapons",
  name: "Arcanite Melee Weapons",
  type: "upgrade",
  gold: 200,
  lumber: 275,
  buildTime: 90,
  replaces: "thoriumMeleeWeapons",
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 1,
  image: "orc/arcanitemeleeweapons.png"
}, {
  id: "steelRangedWeapons",
  name: "Steel Ranged Weapons",
  type: "upgrade",
  gold: 100,
  lumber: 100,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 2,
  image: "orc/steelrangedweapons.png"
}, {
  id: "thoriumRangedWeapons",
  name: "Thorium Ranged Weapons",
  type: "upgrade",
  gold: 150,
  lumber: 200,
  buildTime: 75,
  replaces: "steelRangedWeapons",
  dependsOn: {
    buildings: [],
    upgrades: ["stronghold"]
  },
  order: 2,
  image: "orc/thoriumrangedweapons.png"
}, {
  id: "arcaniteRangedWeapons",
  name: "Arcanite Ranged Weapons",
  type: "upgrade",
  gold: 200,
  lumber: 300,
  buildTime: 90,
  replaces: "thoriumRangedWeapons",
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 2,
  image: "orc/arcaniterangedweapons.png"
}, {
  id: "steelArmor",
  name: "Steel Armor",
  type: "upgrade",
  gold: 150,
  lumber: 75,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 5,
  image: "orc/steelarmor.png"
}, {
  id: "thoriumArmor",
  name: "Thorium Armor",
  type: "upgrade",
  gold: 225,
  lumber: 225,
  buildTime: 75,
  replaces: "steelArmor",
  dependsOn: {
    buildings: [],
    upgrades: ["stronghold"]
  },
  order: 5,
  image: "orc/thoriumarmor.png"
}, {
  id: "arcaniteArmor",
  name: "Arcanite Armor",
  type: "upgrade",
  gold: 300,
  lumber: 375,
  buildTime: 90,
  replaces: "thoriumArmor",
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 5,
  image: "orc/arcanitearmor.png"
}, {
  id: "shamanAdeptTraining",
  name: "Shaman Adept Training",
  type: "upgrade",
  gold: 100,
  lumber: 50,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 9,
  image: "orc/shamanadepttraining.png"
}, {
  id: "shamanMasterTraining",
  name: "Shaman Master Training",
  type: "upgrade",
  gold: 100,
  lumber: 150,
  buildTime: 75,
  replaces: "shamanAdeptTraining",
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 9,
  image: "orc/shamanmastertraining.png"
}, {
  id: "witchDoctorAdeptTraining",
  name: "Witch Doctor Adept Training",
  type: "upgrade",
  gold: 100,
  lumber: 50,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 10,
  image: "orc/witchdoctoradepttraining.png"
}, {
  id: "witchDoctorMasterTraining",
  name: "Witch Doctor Master Training",
  type: "upgrade",
  gold: 100,
  lumber: 150,
  buildTime: 75,
  replaces: "witchDoctorAdeptTraining",
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 10,
  image: "orc/witchdoctormastertraining.png"
}, {
  id: "spiritWalkerAdeptTraining",
  name: "Spirit Walker Adept Training",
  type: "upgrade",
  gold: 100,
  lumber: 100,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 9,
  image: "orc/spiritwalkeradepttraining.png"
}, {
  id: "spiritWalkerMasterTraining",
  name: "Spirit Walker Master Training",
  type: "upgrade",
  gold: 100,
  lumber: 150,
  buildTime: 75,
  replaces: "spiritWalkerAdeptTraining",
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 9,
  image: "orc/spiritwalkermastertraining.png"
}, {
  id: "pillage",
  name: "Pillage",
  type: "upgrade",
  gold: 75,
  lumber: 25,
  buildTime: 60,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 3,
  image: "orc/pillage.gif"
}, {
  id: "bruteStrength",
  name: "Brute Strength",
  type: "upgrade",
  gold: 50,
  lumber: 150,
  buildTime: 40,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 9,
  image: "orc/brutestrength.png"
}, {
  id: "unitInventory",
  name: "Unit Inventory",
  type: "upgrade",
  gold: 50,
  lumber: 25,
  buildTime: 20,
  dependsOn: {
    buildings: ["voodooLounge"],
    upgrades: []
  },
  order: 4,
  image: "orc/unitinventory.png"
}, {
  id: "trollRegeneration",
  name: "Troll Regeneration",
  type: "upgrade",
  gold: 100,
  lumber: 100,
  buildTime: 60,
  dependsOn: {
    buildings: ["warMill"],
    upgrades: ["stronghold"]
  },
  order: 10,
  image: "orc/trollregeneration.png"
}, {
  id: "berserkerUpgrade",
  name: "Berserker Upgrade",
  type: "upgrade",
  gold: 75,
  lumber: 175,
  buildTime: 40,
  dependsOn: {
    buildings: ["warMill"],
    upgrades: ["fortress"]
  },
  order: 6,
  image: "orc/berserkerupgrade.png"
}, {
  id: "burningOil",
  name: "Burning Oil",
  type: "upgrade",
  gold: 50,
  lumber: 150,
  buildTime: 30,
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 7,
  image: "orc/burningoil.gif"
}, {
  id: "ensnare",
  name: "Ensnare",
  type: "upgrade",
  gold: 50,
  lumber: 75,
  buildTime: 40,
  dependsOn: {
    buildings: [],
    upgrades: []
  },
  order: 9,
  image: "orc/ensnare.gif"
}, {
  id: "envenomedSpears",
  name: "Envenomed Spears",
  type: "upgrade",
  gold: 100,
  lumber: 150,
  buildTime: 40,
  dependsOn: {
    buildings: [],
    upgrades: ["fortress"]
  },
  order: 10,
  image: "orc/envenomedspears.gif"
}, {
  id: "warDrumsDamageIncrease",
  name: "War Drums Damage Increase",
  type: "upgrade",
  gold: 100,
  lumber: 150,
  buildTime: 40,
  dependsOn: {
    buildings: ["warMill"],
    upgrades: ["fortress"]
  },
  order: 11,
  image: "orc/wardrumsdamageincrease.png"
}, {
  id: "liquidFire",
  name: "Liquid Fire",
  type: "upgrade",
  gold: 75,
  lumber: 125,
  buildTime: 75,
  dependsOn: {
    buildings: ["voodooLounge"],
    upgrades: ["fortress"]
  },
  order: 7,
  image: "orc/liquidfire.gif"
}, {
  id: "pulverizeDamageIncrease",
  name: "Pulverize Damage Increase",
  type: "upgrade",
  gold: 100,
  lumber: 225,
  buildTime: 40,
  dependsOn: {
    buildings: ["warMill"],
    upgrades: ["fortress"]
  },
  order: 10,
  image: "orc/pulverizedamageincrease.png"
}];

var peonData = units.find(function (u) {
  return u.id === "peon";
});
var greatHallData = buildings.find(function (b) {
  return b.id === "greatHall";
});

var Orc = /*#__PURE__*/function (_Race) {
  _inherits(Orc, _Race);

  var _super = _createSuper(Orc);

  function Orc() {
    _classCallCheck(this, Orc);

    return _super.apply(this, arguments);
  }

  return Orc;
}(Race);

_defineProperty(Orc, "label", "Orc");

_defineProperty(Orc, "id", "orc");

_defineProperty(Orc, "buildings", buildings);

_defineProperty(Orc, "items", items);

_defineProperty(Orc, "units", units);

_defineProperty(Orc, "upgrades", upgrades);

_defineProperty(Orc, "startingResources", new ResourceList({
  gold: 500,
  lumber: 150,
  supply: 11,
  miningWorkers: [],
  harvestingWorkers: [],
  upgrades: [],
  units: [new Unit(peonData), new Unit(peonData), new Unit(peonData), new Unit(peonData), new Unit(peonData)],
  buildings: [new Building(greatHallData)],
  neutralBuildings: Orc.neutralBuildings.map(function (nb) {
    return new NeutralBuilding(nb);
  })
}));

var ResourceManager = /*#__PURE__*/function () {
  function ResourceManager() {
    _classCallCheck(this, ResourceManager);

    this.reset();
  }

  _createClass(ResourceManager, [{
    key: "reset",
    value: function reset() {
      this.resourcesIndices = [];
      this.resources = {};
    }
  }, {
    key: "setResources",
    value: function setResources(tick, resourceList) {
      this.resourcesIndices.push(tick);
      this.resourcesIndices.sort(function (a, b) {
        return a - b;
      });
      this.resources[tick] = resourceList.value;
    }
  }, {
    key: "resourcesAt",
    value: function resourcesAt(tick) {
      var closest = null;

      var _iterator = _createForOfIteratorHelper(this.resourcesIndices),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var index = _step.value;

          if (index < tick) {
            closest = index;
          } else if (index === tick) {
            return this.resources[index];
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (closest === null) {
        return {};
      }

      var timeDiff = tick - closest;
      var clonedResources = clonedeep__default['default'](this.resources[closest]);

      if (this.resources[closest].miningWorkers.length) {
        clonedResources.gold += Math.min(this.resources[closest].miningWorkers.length, 5) * timeDiff * 2;
      }

      if (this.resources[closest].harvestingWorkers.length) {
        clonedResources.lumber += this.resources[closest].harvestingWorkers.length * timeDiff * 1;
      }

      return clonedResources;
    }
  }]);

  return ResourceManager;
}();

/**
 * Warcraft 3 build order tool for a given race
 */

var BuildOrder = /*#__PURE__*/function () {
  /**
   * Create a build order.
   * @param {Options} race - The race that should be used for this build order.
   */
  function BuildOrder(_ref) {
    var race = _ref.race;

    _classCallCheck(this, BuildOrder);

    switch (race) {
      case "orc":
        this.race = Orc;
        break;

      default:
        throw new Error("Race option must be one of: orc");
    }

    this.reset();
    this.buildingManager = new BuildingManager(this.race);
    this.resourceManager = new ResourceManager();
    this.actionManager = new ActionManager(this.race, this.resourceManager);
  }
  /**
   * Reset the build order back to the starting tick of 0.
   */


  _createClass(BuildOrder, [{
    key: "reset",
    value: function reset() {
      this.tick = 0;
    }
    /**
     * Retrieve all actions that can possibly be taken at a building, without considering resources.
     * @param {Building} building - The building to get actions for
     * @returns {Object[]} Actions that can be taken at a building, such as buying items, researching upgrades, or training units.
     */

  }, {
    key: "allBuildingActions",
    value: function allBuildingActions(building) {
      return [].concat(_toConsumableArray(this.buildingManager.allItems(building)), _toConsumableArray(this.buildingManager.allUpgrades(building)), _toConsumableArray(this.buildingManager.allUnits(building)));
    }
    /**
     * The buildings that can be constructed with the current resources.
     * @returns {Object[]} The buildings that can be constructed.
     */

  }, {
    key: "availableBuildings",
    value: function availableBuildings() {
      var resources = this.resourceManager.resourcesAt(this.tick);
      return this.buildingManager.availableBuildings(resources);
    }
    /**
     * Items that can be purchased for the building with the current resources.
     * @param {Building} building - The building where items will be purchased.
     * @returns {Object[]} Data for items that can be purchased.
     */

  }, {
    key: "availableItemsForBuilding",
    value: function availableItemsForBuilding(building) {
      var atTick = this.resourceManager.resourcesAt(this.tick);
      return this.buildingManager.availableItems(building, this.tick, atTick);
    }
    /**
     * Units that can be trained for the building with the current resources.
     * @param {Building} building - The building where units can be trained.
     * @returns {Object[]} Data for units that can be trained.
     */

  }, {
    key: "availableUnitsForBuilding",
    value: function availableUnitsForBuilding(building) {
      var atTick = this.resourceManager.resourcesAt(this.tick);
      return this.buildingManager.availableUnits(building, this.tick, atTick);
    }
    /**
     * Upgrades that can be researched for the building with the current resources.
     * @param {Building} building - The building where upgrades can be researched.
     * @returns {Object[]} Data for upgrades that can be researched.
     */

  }, {
    key: "availableUpgradesForBuilding",
    value: function availableUpgradesForBuilding(building) {
      var atTick = this.resourceManager.resourcesAt(this.tick);
      return this.buildingManager.availableUpgrades(building, atTick);
    }
    /**
     * Queue a building action using the worker.
     * @param {Object} buildingData - The building to be constructed.
     * @param {Unit} worker - The builder unit to assign to the construction
     */

  }, {
    key: "build",
    value: function build(buildingData, worker) {
      this.actionManager.build(this.tick, buildingData, worker);
    }
    /**
     * Queue a buy action at the building
     * @param {Object} itemData - The item to purchase
     * @param {Building} building - The building where the item is bought from
     */

  }, {
    key: "buy",
    value: function buy(itemData, building) {
      this.actionManager.buy(this.tick, itemData, building);
    }
    /**
     * Queue a train action at the building.
     * @param {Object} unitData - The unit to train.
     * @param {Building} building - The building where the unit will be trained.
     */

  }, {
    key: "train",
    value: function train(unitData, building) {
      this.actionManager.train(this.tick, unitData, building);
    }
    /**
     * Queue an upgrade action at the building.
     * @param {Object} upgradeData - The upgrade to research.
     * @param {Building} building - The building where the upgrade will be researched.
     */

  }, {
    key: "upgrade",
    value: function upgrade(upgradeData, building) {
      this.actionManager.upgrade(this.tick, upgradeData, building);
    }
    /**
     * Assign a worker to mine gold.
     * @param {Unit} worker - The worker to assign to mining
     */

  }, {
    key: "assignToGold",
    value: function assignToGold(worker) {
      this.actionManager.assignToGold(this.tick, worker);
    }
    /**
     * Remove a worker from the mining gold.
     */

  }, {
    key: "removeFromGold",
    value: function removeFromGold() {
      var _this$resourceManager = _slicedToArray(this.resourceManager.resourcesAt(this.tick).miningWorkers, 1),
          miner = _this$resourceManager[0];

      if (miner) {
        this.actionManager.removeFromGold(this.tick, miner);
      }
    }
    /**
     * Assign a worker to harvest lumber.
     * @param {Unit} worker - The worker to assign to harvesting.
     */

  }, {
    key: "assignToLumber",
    value: function assignToLumber(worker) {
      this.actionManager.assignToLumber(this.tick, worker);
    }
    /**
     * Remove a worker from harvesting lumber.
     */

  }, {
    key: "removeFromLumber",
    value: function removeFromLumber() {
      var _this$resourceManager2 = _slicedToArray(this.resourceManager.resourcesAt(this.tick).harvestingWorkers, 1),
          harvester = _this$resourceManager2[0];

      if (harvester) {
        this.actionManager.removeFromLumber(this.tick, harvester);
      }
    }
    /**
     * Remove an action from the queue.
     * @param {Action} action - The action to remove.
     */

  }, {
    key: "removeAction",
    value: function removeAction(action) {
      this.actionManager.removeAction(action);
    }
    /**
     * @type {Building[]} - Buildings that are available for actions at the current tick.
     */

  }, {
    key: "buildings",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).buildings;
    }
    /**
     * type {NeutralBuilding[]} - Non-race buildings that are available for actions at the current tick.
     */

  }, {
    key: "neutralBuildings",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).neutralBuildings;
    }
    /**
     * Number of mining workers at the current tick.
     * @type {Number}
     */

  }, {
    key: "miningWorkers",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).miningWorkers;
    }
    /**
     * Number of harvesting workers at the current tick.
     * @type {Number}
     */

  }, {
    key: "harvestingWorkers",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).harvestingWorkers;
    }
    /**
     * Units at the current tick that are available for actions.
     * @type {Unit[]}
     */

  }, {
    key: "units",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).units;
    }
    /**
     * All buildings for the current race.
     * @type {Object[]}
     */

  }, {
    key: "allBuildings",
    get: function get() {
      return this.buildingManager.allBuildings();
    }
    /**
     * Amount of gold available at the current tick.
     * @type {Number}
     */

  }, {
    key: "gold",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).gold;
    }
    /**
     * Amount of lumber at the current tick.
     * @type {Number}
     */

  }, {
    key: "lumber",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).lumber;
    }
    /**
     * The list of queued actions.
     * @type {Action[]}
     */

  }, {
    key: "actions",
    get: function get() {
      return this.actionManager.getActions();
    }
    /**
     * The amount of produced supply remaining at the current tick.
     * @type {Number}
     */

  }, {
    key: "supply",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).supply;
    }
    /**
     * The total amount of supply produced from all buildings.
     * @type {Number}
     */

  }, {
    key: "totalSupply",
    get: function get() {
      var _this = this;

      return this.actions.reduce(function (supply, action) {
        if (action.type === "build" && action.start + action.duration <= _this.tick) {
          return supply + action.meta.building.supply;
        }

        return supply;
      }, this.race.startingResources.value.supply);
    }
    /**
     * An inprogress state of a unit, with the start, end, and current ticks for the unit.
     * @type {Object[]}
     */

  }, {
    key: "inprogressUnits",
    get: function get() {
      var _this2 = this;

      var id = 0;
      return this.actions.reduce(function (units, action) {
        if (action.type === "train" && action.start <= _this2.tick && action.start + action.duration > _this2.tick) {
          units.push({
            unit: action.meta.unit,
            start: action.start,
            end: action.start + action.duration,
            current: _this2.tick,
            inprogressId: id++
          });
        }

        return units;
      }, []);
    }
    /**
     * An inprogress state of a building, with the start, end, and current ticks for the building.
     * @type {Object[]}
     */

  }, {
    key: "inprogressBuildings",
    get: function get() {
      var _this3 = this;

      // prevent key conflicts in ids
      var id = this.buildings.length + 1;
      return this.actions.reduce(function (buildings, action) {
        if (action.type === "build" && action.start <= _this3.tick && action.start + action.duration > _this3.tick) {
          buildings.push({
            unit: action.meta.building,
            start: action.start,
            end: action.start + action.duration,
            current: _this3.tick,
            inprogressId: id++
          });
        }

        return buildings;
      }, []);
    }
    /**
     * All of the buildings that have been completed by the current tick. Including unavailable buildings.
     * @type {Building[]}
     */

  }, {
    key: "completedBuildings",
    get: function get() {
      var _this4 = this;

      var buildings = [];
      var id = this.race.startingResources.value.buildings.length + 1;
      this.actions.forEach(function (action) {
        if (action.type === "build" && action.start + action.duration <= _this4.tick) {
          buildings.push(_objectSpread2({
            _id: id++
          }, action.meta.building));
        }
      });
      return buildings.concat(this.race.startingResources.value.buildings);
    }
    /**
     * All of the units that have been completed by the current tick. Including unavailable units.
     * @type {Unit[]}
     */

  }, {
    key: "completedUnits",
    get: function get() {
      var _this5 = this;

      var units = [];
      var id = this.race.startingResources.value.units.length + 1;
      this.actions.forEach(function (action) {
        if (action.type === "train" && action.start + action.duration <= _this5.tick) {
          units.push(_objectSpread2({
            _id: id++
          }, action.meta.unit));
        }
      });
      return units.concat(this.race.startingResources.value.units);
    }
    /**
     * All of the upgrades that have been completed by the current tick.
     * @type {Upgrade[]}
     */

  }, {
    key: "completedUpgrades",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).upgrades;
    }
    /**
     * All of the items that have been purchased by the current tick.
     * @type {Item[]}
     */

  }, {
    key: "purchasedItems",
    get: function get() {
      return this.resourceManager.resourcesAt(this.tick).items;
    }
  }]);

  return BuildOrder;
}();

exports.BuildOrder = BuildOrder;
