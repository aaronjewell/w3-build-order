<template>
  <div>
    <h2>Units</h2>
    <ul>
      <li v-for="unit in units" :key="unit._id">
        <div class="unit">
          <div class="unit__display">
            <img
              class="unit__image"
              :src="`/images/${race.id}/${unit.image}`"
              :alt="unit.name"
            />
          </div>

          <div class="unit__actions" v-if="unit.canBuild || unit.canMine || unit.canHarvets">
            <button
              :style="{ top: topOffset(building) + 'px', left: leftOffset(building) + 'px' }"
              v-for="building in availableBuildings"
              v-if="unit.canBuild"
              :key="building.id"
              @click.prevent="buildFn(unit, building)"
              class="unit__action-button"
              :title="`${building.name}`"
            >
              <img
                class="unit__action-image"
                :src="`/images/${race.id}/${building.image}`"
              />
            </button>
            <button
            :style="{ top: topOffset({ order: 11 }) + 'px', left: leftOffset({ order: 11 }) + 'px' }"
              class="unit__action-button"
              v-if="unit.canMine"
              @click.prevent="assignToGoldFn(unit)"
            >
              G
            </button>
            <button
                        :style="{ top: topOffset({ order: 12 }) + 'px', left: leftOffset({ order: 12 }) + 'px' }"
              class="unit__action-button"
              v-if="unit.canHarvest"
              @click.prevent="assignToLumberFn(unit)"
            >
              L
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UnitList",
  props: {
    race: {
      required: true,
    },
    availableBuildings: {
      required: true,
    },
    units: {
      required: true,
    },
    buildFn: {
      required: true,
    },
    assignToGoldFn: {
      required: true,
    },
    assignToLumberFn: {
      required: true,
    },
  },
  methods: {
      topOffset(building) {
          return Math.floor((building.order - 1) / 4) * 32;
      },
      leftOffset(building) {
          return ((building.order - 1) % 4) * 32;
      }
  }
};
</script>

<style lang="scss">
.unit {
  display: flex;

  &__display {
  }

  &__image {
      height: 32px;
      width: 32px;
  }

  &__actions {
      background-color: black;
      position: relative;
      width: 128px;
      height: 96px;
  }

  &__action-button {
      position: absolute;
      top: 0;
      left: 0;
      height: 32px;
      width: 32px;
      font-size: 0.5rem;
    background-color: black;
    color: white;
  }

  &__action-image {
      width: 32px;
      height: 32px;
  }
}
</style>
