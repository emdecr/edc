<template>
    <header>
        <nav>
            <ul>
                <li v-if="$route.path != '/'"><nuxt-link  to="/">Home</nuxt-link></li>
                <li><nuxt-link to="/about">About</nuxt-link></li>
                <li><nuxt-link to="/projects">Projects</nuxt-link></li>
                <li><a href="https://theswell.space" target="_blank">The Swell Space</a></li>
                <li><nuxt-link to="#contact">Contact</nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   components: {
   },
   data: function() {
      return {

      }
   },
   methods: {

   },
}
</script>

<style lang="scss" scoped>

ul {
    display: flex;
    list-style-type: none;
    justify-content: flex-end;
    padding: 0;
}

.nuxt-link-exact-active {
    font-weight: bold;
}

a {
    font-family: "input-mono",monospace;
    text-decoration: none;
    padding: 1rem;
    display: block;
}

</style>
