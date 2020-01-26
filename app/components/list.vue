<template>
  <div class="list-container">
    <ul>
      <li v-for="(item, i) in info" :key="'list'+i">
        <nuxt-link :to="'/'+path+'/'+item.slug" v-html="item.title.rendered"></nuxt-link>
        <span class="date">{{$moment(item.date).format('LL') }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["info", "path", "children"],
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>