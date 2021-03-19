<template>
  <div class="w3bo-units">
    <ul class="w3bo-units__list w3bo-list-unstyled">
      <li
        class="w3bo-units__item"
        v-for="unit in sortedCompletedUnits"
        :key="unit._id"
        :class="{ selected: isSelected(unit) }"
      >
        <button class="w3bo-unit" disabled style="opacity: 0.3;">
          <div class="w3bo-unit__display">
            <img
              class="w3bo-unit__image"
              :src="getImgUrl(unit.image)"
              :alt="unit.name"
            />
          </div>
        </button>
        <button
          class="w3bo-unit w3bo-unit--available w3bo-fade-in w3bo-btn"
          :style="{ visibility: availableUnit(unit) ? 'visible' : 'hidden' }"
          @click.prevent="() => $emit('selected', unit)"
        >
          <div class="w3bo-unit__display">
            <img
              class="w3bo-unit__image"
              :src="getImgUrl(unit.image)"
              :alt="unit.name"
            />
          </div>
        </button>
      </li>
      <li
        v-for="inprogress in inprogressUnits"
        :key="inprogress.inprogressId"
        class="w3bo-units__item"
      >
        <div class="w3bo-unit w3bo-fade-in-disabled">
          <div class="w3bo-unit__display">
            <img
              class="w3bo-unit__image"
              :src="getImgUrl(inprogress.unit.image)"
              :alt="inprogress.unit.name"
            />
          </div>
        </div>
        <span
          :style="{
            right: `${((inprogress.end - inprogress.current) /
              (inprogress.end - inprogress.start)) *
              100}%`,
          }"
          class="w3bo-unit__progress-bar"
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
    getImgUrl(image) {
      return require(`../images/${image}`)
    },
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
