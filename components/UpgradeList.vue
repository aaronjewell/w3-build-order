<template>
  <div class="upgrades">
    <ul class="d-flex flex-wrap list-unstyled">
      <li v-for="upgrade in completedUpgrades" v-bind:key="upgrade._id">
        <img
          class="upgrades__image"
          :src="`images/${upgrade.image}`"
          :alt="upgrade.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UpgradeList",
  props: {
    completedUpgrades: {
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
$size: 64px;

.upgrades {
  &__image {
    width: $size;
    height: $size;
  }
}
</style>
