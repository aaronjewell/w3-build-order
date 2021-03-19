<template>
  <div class="w3bo-buildings">
    <ul class="w3bo-buildings__list w3bo-list-unstyled">
      <li
        class="w3bo-buildings__item"
        v-for="building in sortedCompletedBuildings"
        :key="building._id"
        :class="{ selected: isSelected(building) }"
      >
        <div class="w3bo-building w3bo-fade-in-disabled">
          <div class="w3bo-building__display">
            <img
              class="w3bo-building__image"
              :src="getImgUrl(building.image)"
              :alt="building.name"
            />
          </div>
        </div>
        <div
          class="w3bo-building w3bo-building--available w3bo-fade-in"
          :style="{
            visibility: availableBuilding(building) ? 'visible' : 'hidden',
          }"
          @click="() => $emit('selected', building)"
        >
          <div class="w3bo-building__display">
            <img
              class="w3bo-building__image"
              :src="getImgUrl(building.image)"
              :alt="building.name"
            />
          </div>
        </div>
      </li>
      <li
        v-for="inprogress in inprogressBuildings"
        :key="`${inprogress.inprogressId}-inprogress`"
        class="w3bo-buildings__item"
      >
        <div class="w3bo-building w3bo-fade-in-disabled">
          <div class="w3bo-building__display">
            <img
              class="w3bo-building__image"
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
          class="w3bo-building__progress-bar"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getImgUrl } from "../utils/images"

export default {
  name: "BuildingList",
  props: {
    buildings: {
      required: true,
    },
    completedBuildings: {
      required: true,
    },
    inprogressBuildings: {
      default: () => [],
    },
    selected: {
      required: true,
    },
  },
  computed: {
    sortedCompletedBuildings() {
      return this.completedBuildings.sort((a, b) => a._id - b._id)
    },
  },
  methods: {
    getImgUrl,
    availableBuilding(completed) {
      return (
        this.buildings.find(b => b._id === completed._id) ||
        typeof completed.buildTime === "undefined"
      )
    },
    isSelected(building) {
      return (
        this.selected &&
        this.selected.type === building.type &&
        this.selected.id === building.id &&
        this.selected._id === building._id
      )
    },
  },
}
</script>
