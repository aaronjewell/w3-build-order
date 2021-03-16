<template>
  <div class="w3bo-upgrades">
    <ul class="w3bo-upgrades__list w3bo-list-unstyled">
      <li v-for="upgrade in completedUpgrades" v-bind:key="upgrade._id">
        <img
          class="w3bo-upgrades__image"
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
