<template>
  <div class="w3bo-action-list">
    <ul class="w3bo-action-list__list w3bo-list-unstyled">
      <li
        class="w3bo-action-list__list-item"
        :class="{ 'w3bo-bg-danger': !action.valid }"
        v-for="action in actions"
        :key="action.id"
      >
        <div class="w3bo-action">
          <span>{{ formatTime(action.start) }}</span
          >&nbsp;<img
            class="w3bo-action__image"
            :src="`images/${image(action)}`"
          /><span>{{ label(action) }}</span
          >&nbsp;<span v-if="action.error">{{ action.error }}</span>
          <button
            class="w3bo-action__button w3bo-action__button--rewind w3bo-btn w3bo-btn--primary"
            @click.prevent="changeTickFn(action.start)"
          >
            <i class="fas fa-fast-backward"></i>
          </button>
          <button
            class="w3bo-action__button w3bo-btn w3bo-btn--primary"
            :class="{ 'w3bo-invisible': action.duration === 0 }"
            @click.prevent="changeTickFn(action.start + action.duration)"
          >
            <i class="fas fa-fast-forward"></i>
          </button>
          <button
            class="w3bo-btn w3bo-btn--danger"
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
        case "removeFromGold":
          return "Remove worker from gold mine"
        case "assignToLumber":
          return "Assign worker to lumber"
        case "removeFromLumber":
          return "Remove worker from gold mine"
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
        case "removeFromGold":
          return "common/chestofgold.png"
        case "assignToLumber":
        case "removeFromLumber":
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
