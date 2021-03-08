<template>
  <div>
    <ul class="action__list list-unstyled">
      <li
        class="mb-2 py-1 px-0"
        :class="{ 'bg-danger': !action.valid }"
        v-for="action in actions"
        :key="action.id"
      >
        <div class="w-100 d-flex align-items-center">
          <span>{{ formatTime(action.start) }}</span
          >&nbsp;<img
            class="action__image"
            :src="`images/${image(action)}`"
          /><span>{{ label(action) }}</span
          >&nbsp;<span v-if="action.error">{{ action.error }}</span>
          <button
            class="btn btn-primary ml-auto mr-2"
            @click.prevent="changeTickFn(action.start)"
          >
            <i class="fas fa-fast-backward"></i>
          </button>
          <button
            class="btn btn-primary mr-2"
            :class="{ invisible: action.duration === 0 }"
            @click.prevent="changeTickFn(action.start + action.duration)"
          >
            <i class="fas fa-fast-forward"></i>
          </button>
          <button
            class="btn btn-danger"
            :aria-label="`Remove ${action.name} action`"
            @click.prevent="removeActionFn(action)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from "../utils/time"

export default {
  name: "ActionList",
  props: {
    actions: {
      required: true,
    },
    removeActionFn: {
      required: true,
    },
    changeTickFn: {
      required: true,
    },
  },
  methods: {
    label(action) {
      switch (action.type) {
        case "build":
          return `Build ${action.meta.building.name}`
        case "train":
          return `Train ${action.meta.unit.name}`
        case "assignToGold":
          return "Assign worker to gold mine"
        case "assignToLumber":
          return "Assign worker to lumber"
        case "upgrade":
          return `Research ${action.meta.upgrade.name}`
        case "buy":
          return `Purchase ${action.meta.item.name}`
      }
    },
    image(action) {
      switch (action.type) {
        case "build":
          return action.meta.building.image
        case "train":
          return action.meta.unit.image
        case "assignToGold":
          return "common/chestofgold.png"
        case "assignToLumber":
          return "common/lumber.png"
        case "upgrade":
          return action.meta.upgrade.image
        case "buy":
          return action.meta.item.image
      }
    },
    formatTime,
  },
}
</script>

<style lang="scss">
$size: 32px;

.action {
  &__image {
    margin-left: 8px;
    margin-right: 8px;
    width: $size;
    height: $size;
  }
  &--invalid {
    background-color: tomato;
  }
}
</style>
