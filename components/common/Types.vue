<template>
    <ul>
        <Type :key="i" :type="type" v-for="(type, i) in types" :types="types"/>
    </ul>
</template>

<script>
    import Type from "./Type";

    export default {
        name: "Types",
        components: {Type},
        props: {
            types: Array
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        position : relative;
        margin   : auto .25rem .25rem auto;
        display  : flex;
    }
</style>