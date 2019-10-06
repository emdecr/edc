<template>
    <main class="flex-all flex--ai-c flex--jc-c">
       <section>
            <p>
                brb. currently moulting.
            </p>
            <a   href="mailto:hello@emilydelacruz.com">hello@emilydelacruz.com</a><br/>
            <a href="https://twitter.com/emdecr" target="_blank" class="flex-all flex--ai-c">@emdecr</a>
       </section>
    </main>
</template>

<script>
    export default{
        components:{
        },
        async fetch ({ store }) {
            await store.dispatch('content/getGithub');
            await store.dispatch('content/getMusic');
            await store.dispatch('content/getPages');
            await store.dispatch('content/getProjects');
            await store.dispatch('content/getShelfItems');
        }
    }
</script>

<style lang="scss" scoped>

main {
    min-height: 100vh;
}
</style>
