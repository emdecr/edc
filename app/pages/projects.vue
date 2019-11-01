<template>
    <main>
        <h1>Projects</h1>
    </main>
</template>

<script>
    export default {
        components: {
        },
        async fetch ({ store }) {
            await store.dispatch('content/getPages');
            await store.dispatch('content/getProjects');
        },
        computed: {
        },
    }
</script>

<style lang="scss" scoped>

main {
    max-width: 1000px;
    margin: 0 auto;
}

</style>
