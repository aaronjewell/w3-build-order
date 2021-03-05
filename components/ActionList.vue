<template>
  <div>
    <ul class="action__list list-unstyled">
      <li
        class="mb-3 p-2"
        :class="{ 'bg-danger': !action.valid }"
        v-for="action in actions"
        :key="action.id"
      >
        <div class="w-100 d-flex align-items-center">
          <span>{{ action.start }}s</span>&nbsp;<span>{{ label(action) }}</span
          >&nbsp;<span v-if="action.error">{{ action.error }}</span>
          <button
            class="btn btn-primary ml-auto mr-2"
            @click.prevent="changeTickFn(action.start)"
          >
            Go To Start
          </button>
          <button
            class="btn btn-primary mr-2"
            :class="{ invisible: action.duration === 0 }"
            @click.prevent="changeTickFn(action.start + action.duration)"
          >
            Go To Finish
          </button>
          <button
            class="btn btn-danger"
            @click.prevent="removeActionFn(action)"
          >
            Remove
          </button>
        </div>
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
        case "upgrade":
          return `Research ${action.meta.upgrade.name}`;
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
}
</style>
