<template>
    <main>
        <h1>About</h1>
        <section>
           <h2>The Shelf</h2>
            <div class="shelf-container grid">
                <figure class="shelf-item flex-all flex--col flex--jc-fe flex--ai-c">
                        <!-- <img src="" alt=""> -->
                        <div class="image"></div>
                        <ficaption>Caption</ficaption>
                </figure>
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

.shelf-container {
    max-width: 1000px;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.shelf-item {
    min-height: 200px;
    border-bottom: 10px solid black;

    
}

.image {
    width: 100px;
    height: 150px;
    background: red;
}

</style>
