<template>
    <li :class="[`type-${type.type.name}`]" :style="getTypeStyleBorders(type.type.name)">
        <p v-html="type.type.name"/>
    </li>
</template>

<script>
    import {types} from '@/mixins/typesMixin.js';

    export default {
        name: "Type",
        mixins: [types],
        props: {
            type: Object,
            types: Array
        }
    }
</script>

<style lang="scss" scoped>
    li {
        margin-left    : .25rem;
        font-size      : .7rem;
        padding        : .05rem 1rem;
        border-radius  : 5px;
        border-width   : 2px;
        text-transform : uppercase;
        box-shadow     : 0 2px 3px 0 rgba(0, 0, 0, .5)
    }
</style>