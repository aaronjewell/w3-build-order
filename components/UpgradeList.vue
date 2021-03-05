<template>
  <div class="upgrades">
    <div class="upgrades_upgrades d-flex flex-wrap">
      <button
        v-for="upgrade in availableUpgrades"
        :key="upgrade.id"
        @click.prevent="upgradeFn(upgrade, buildingForUpgrade(upgrade.id))"
        class="training__button"
        :title="`Train ${upgrade.name}`"
      >
        <img class="training__unit-image" :src="`/images/${upgrade.image}`" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpgradeList",
  props: {
    availableUpgrades: {
      required: true,
    },
    buildings: {
      required: true,
    },
    upgradeFn: {
      require: true,
    },
  },
  methods: {
    buildingForUpgrade(upgradeId) {
      return this.buildings.find((b) => b.upgrades.includes(upgradeId));
    },
  },
};
</script>

<style lang="scss"></style>
