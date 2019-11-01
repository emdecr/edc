<template>
    <main class="">
       <section class="intro">
            <span class="name">emily dela cruz</span><span class="pronouns">she/her</span>
            <p>I'm a web developer, who also wants to build her research muscles.</p>
            <div class="btns">
                <nuxt-link class="btn" to="/about">My journey thus far...</nuxt-link>
                <nuxt-link class="btn" to="/projects">Opportunities and challenges</nuxt-link>
            </div>
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
    max-width: 1000px;
    margin: 0 auto;
    padding: 100px 0;
}

span.name {
    font-family: ff-more-web-pro,serif;
    font-weight: 500;
    font-style: normal;
    font-size: 90px;
    color: rgb(37, 37, 37);
}

.pronouns {
    font-size: 0.8rem;
    margin-left: 1rem;
    display: inline-block;
    // font-style: italic;
}

@media (prefers-color-scheme: dark) {
    span.name {
        color: #d7d7d7;
    }
}

p {
    font-family: input-mono, monospace;
    font-weight: 300;
    font-style: normal;
}

.btns {
    margin-top: 1rem;
}
</style>
