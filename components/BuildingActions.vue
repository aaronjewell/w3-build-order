<template>
  <div class="position-relative w3bo-fade-in-quick">
    <div
      class="w3bo-building__actions position-absolute w3bo-building__actions--all-actions"
      v-if="allActions.length"
    >
      <button
        :style="{
          'grid-row': row(action),
          'grid-column': column(action),
          opacity: 0.3,
        }"
        disabled
        v-for="action in allActions"
        :key="action.id"
        class="w3bo-building__action-button"
        :title="`${action.name}`"
      >
        <img
          class="w3bo-building__action-image"
          :src="`images/${action.image}`"
        />
      </button>
    </div>
    <div
      class="w3bo-building__actions w3bo-building__actions--available"
      v-if="availableActions.length"
    >
      <button
        :style="{
          'grid-row': row(action),
          'grid-column': column(action),
        }"
        v-for="action in availableActions"
        :key="action.id"
        @click.prevent="doAction(action)"
        class="w3bo-building__action-button"
        :title="`${action.name}`"
      >
        <img
          class="w3bo-building__action-image"
          :src="`images/${action.image}`"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuildingActions",
  props: {
    availableActions: {
      required: true,
    },
    allActions: {
      required: true,
    },
    building: {
      required: true,
    },
    buyFn: {
      required: true,
    },
    trainFn: {
      required: true,
    },
    upgradeFn: {
      required: true,
    },
  },
  methods: {
    doAction(entity) {
      this.$emit("action")
      switch (entity.type) {
        case "unit":
        case "neutralUnit":
          return this.trainFn(entity, this.building)
        case "upgrade":
          return this.upgradeFn(entity, this.building)
        case "item":
          return this.buyFn(entity, this.building)
      }
    },
    row(entity) {
      return Math.floor((entity.order - 1) / 4) + 1
    },
    column(entity) {
      return ((entity.order - 1) % 4) + 1
    },
  },
}
</script>
