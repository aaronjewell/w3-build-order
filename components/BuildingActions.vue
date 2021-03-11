<template>
  <div class="position-relative fade-in-quick">
    <div
      class="building__actions position-absolute building__actions--all-actions"
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
        class="building__action-button"
        :title="`${action.name}`"
      >
        <img class="building__action-image" :src="`images/${action.image}`" />
      </button>
    </div>
    <div
      class="building__actions position-relative"
      v-if="availableActions.length"
      style="z-index: 1"
    >
      <button
        :style="{
          'grid-row': row(action),
          'grid-column': column(action),
        }"
        v-for="action in availableActions"
        :key="action.id"
        @click.prevent="doAction(action)"
        class="building__action-button"
        :title="`${action.name}`"
      >
        <img class="building__action-image" :src="`images/${action.image}`" />
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

<style lang="scss">
$size: 48px;

.building {
  &__image {
    height: $size;
    width: $size;
  }

  &__actions {
    display: inline-grid;
    grid-template-columns: $size $size $size $size;
    grid-template-rows: $size $size $size;
    grid-gap: 4px;
    padding: 4px;
    border-radius: 8px;
    border: 6px solid hsl(0, 0%, 12%);
    position: relative;

    &--all-actions {
      background-color: hsl(0, 0%, 16%);
      box-shadow: 2px 2px 8px -2px hsl(0deg 0% 5%);
    }
  }

  &__action-button {
    margin: 0;
    padding: 0;
    height: $size;
    width: $size;
    transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      transform: translateX(-1px) translateY(-1px);
      box-shadow: 2px 2px 8px -4px hsl(0, 0%, 75%);
    }
  }

  &__action-image {
    width: $size;
    height: $size;
  }
}
</style>
