<template>
  <main>
    <h1>The (Full) Shelf</h1>
    <comp-shelf :shelf="fullShelf"/>
  </main>
</template>

<script>
import Shelf from "~/components/shelf.vue";
export default {
  components: {
    "comp-shelf": Shelf
  },
  async fetch({ store }) {
    await store.dispatch("content/getAllShelfItems");
  },
  computed: {
    fullShelf() {
      return this.$store.getters["content/getFullShelf"];
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  margin: 0 auto;
}

.shelf-container {
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.shelf-item {
  margin-bottom: 4rem;
  &:hover,
  &:focus,
  &:active {
    .shelf-item__content {
      transform: scale(1.02) translateY(-5px);
    }
    span {
      font-weight: bold;
    }
  }
}

.shelf-item img {
  max-height: 150px;
  max-width: 100%;
}

.shelf-item__content {
  transition: all 0.5s ease;
  padding: 0 2rem;
}

.shelf-item__content span {
  font-family: "input-mono", monospace;
  font-weight: 100;
  font-style: normal;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.about-bottom {
  grid-template-columns: 1fr 1fr;
}

.github {
  li {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
}

.music-grid {
  grid-template-columns: 2fr 8fr;
  span {
    font-size: 0.8rem;
  }
}
</style>
