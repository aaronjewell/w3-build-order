<template>
  <div>
    <ul class="units d-flex flex-wrap list-unstyled position-relative">
      <li
        class="units__item position-relative"
        v-for="unit in sortedCompletedUnits"
        :key="unit._id"
        :class="{ selected: isSelected(unit) }"
      >
        <button
          class="unit position-absolute"
          disabled
          style="top: 0; left: 0; opacity: 0.3;"
        >
          <div class="unit__display">
            <img
              class="unit__image"
              :src="`images/${unit.image}`"
              :alt="unit.name"
            />
          </div>
        </button>
        <button
          class="unit fade-in position-relative"
          style="z-index: 1;"
          :style="{ visibility: availableUnit(unit) ? 'visible' : 'hidden' }"
          @click.prevent="() => $emit('selected', unit)"
        >
          <div class="unit__display">
            <img
              class="unit__image"
              :src="`images/${unit.image}`"
              :alt="unit.name"
            />
          </div>
        </button>
      </li>
      <li
        v-for="inprogress in inprogressUnits"
        :key="inprogress.inprogressId"
        class="units__item position-relative"
      >
        <div class="unit fade-in-disabled">
          <div class="unit__display">
            <img
              class="unit__image"
              :src="`images/${inprogress.unit.image}`"
              :alt="inprogress.unit.name"
            />
          </div>
        </div>
        <span
          :style="{
            right: `${((inprogress.end - inprogress.current) /
              (inprogress.end - inprogress.start)) *
              100}%`,
            transition: 'right 200ms ease-in-out',
          }"
          class="unit__progress-bar"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UnitList",
  props: {
    units: {
      required: true,
    },
    inprogressUnits: {
      required: true,
    },
    completedUnits: {
      required: true,
    },
    selected: {
      required: true,
    },
  },
  computed: {
    sortedCompletedUnits() {
      return this.completedUnits.sort((a, b) => a._id - b._id)
    },
  },
  methods: {
    availableUnit(completed) {
      return this.units.find(u => u._id === completed._id)
    },
    isSelected(unit) {
      return (
        this.selected &&
        this.selected.type === unit.type &&
        this.selected._id === unit._id
      )
    },
  },
}
</script>

<style scoped lang="scss">
$size: 32px;

.units {
  &__item {
    z-index: 0;
    &.selected {
      box-shadow: 0 0 8px 2px hsl(0, 0%, 95%);
      z-index: 1;
    }
  }
}
.unit {
  padding: 0;
  margin: 0;
  transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 2px 2px 8px -4px hsl(0, 0%, 75%);
  }

  &__image {
    height: $size;
    width: $size;
  }

  &__progress-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    background-color: yellow;
  }
}
</style>
