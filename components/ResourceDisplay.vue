<template>
    <div class="resource-display">
        <span><img class="resource-display__icon" src="/images/common/icongold.gif"/>{{` ${gold}`}}</span>    
        <span><img class="resource-display__icon" src="/images/common/iconlumber.gif"/>{{` ${lumber}`}}</span>    
        <span><img class="resource-display__icon" src="/images/common/iconsupply.gif"/>{{` ${supplyUsed}/${supplyTotal}`}}</span>    
    </div>
</template>

<script>
export default {
    name: "ResourceDisplay",
    props: {
        gold: {
            default: 0
        },
        lumber: {
            default: 0
        },
        supplyUsed: {
            default: 0 
        },
        supplyTotal: {
            default: 0
        }
    }
}
</script>

<style lang="scss">
    .resource-display {
        display: flex;
        background-color: black;
        color: white;
        align-items: center;

        &> * {
            display: flex;
            align-items: center;
            font-size: 0.875rem;
            
            &:not(:last-child) {
                margin-right: 16px;
            }
        }

        &__icon {
            margin-right: 8px;
        }
    }
</style>