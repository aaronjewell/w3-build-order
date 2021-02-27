<template>
  <div>
    <h2>Plans</h2>
    <ul class="action__list">
      <li v-for="action in actions" :key="action.id">
        <div :class="{ action__invalid: !action.valid }">
          <span>{{ action.start }}s</span> <span>{{ label(action) }}</span>
          <button @click.prevent="changeTickFn(action.start)">
            Go To Start
          </button>
          <button
            v-if="action.duration > 0"
            @click.prevent="changeTickFn(action.start + action.duration)"
          >
            Go To Finish
          </button>
          <button
            class="action__remove"
            @click.prevent="removeActionFn(action)"
          >
            &times;
          </button>
        </div>
      </li>
    </ul>
    <ul class="action__list">
      <li v-for="action in actions" :key="action.id">
        <pre>{{ action }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
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
          return `Build ${action.meta.building.name}`;
        case "train":
          return `Train ${action.meta.unit.name}`;
        case "assignToGold":
          return "Assign worker to gold";
        case "assignToLumber":
          return "Assign worker to lumber";
      }
    },
  },
};
</script>

<style lang="scss">
.action {
  &--invalid {
    background-color: tomato;
  }

  &__list {
  }
  &__remove {
    border: 0;
    margin: 0;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: tomato;
    font-size: 1.25rem;
    line-height: 1;
    color: black;
  }
}
</style>
