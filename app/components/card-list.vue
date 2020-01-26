<template>
  <div class="card-list-container">
    <template v-if="children =='no'">
      <template v-for="(item, i) in info">
        <nuxt-link :to="'/'+path+'/'+item.slug" :key="'item-'+i" v-if="item.parent == 0">
          <img
            v-if="item.hasOwnProperty('_embedded')"
            :src="lrgImage(item)"
            :alt="item.title.rendered"
          >
          <h3 class="mono" v-html="item.title.rendered"></h3>
        </nuxt-link>
      </template>
    </template>
    <template v-else>
      <template v-if="path == 'projects'">
        <template v-for="(item, i) in info">
          <a
            :href="item.meta_box._project_link"
            v-if="item.meta_box._project_link != ''"
            :key="'item-'+i"
          >
            <img
              v-if="item.hasOwnProperty('_embedded')"
              :src="lrgImage(item)"
              :alt="item.title.rendered"
            >
            <div class="title" v-if="item.parent != 0">
              <h3 class="mono" v-html="item.title.rendered"></h3>
              <!-- <sup>*</sup> -->
            </div>
            <h3 class="mono" v-if="item.parent == 0" v-html="item.title.rendered"></h3>
          </a>
          <nuxt-link :to="'/projects/'+item.slug" :key="'item-'+i" v-else>
            <img
              v-if="item.hasOwnProperty('_embedded')"
              :src="lrgImage(item)"
              :alt="item.title.rendered"
            >
            <div class="title" v-if="item.parent != 0">
              <h3 class="mono" v-html="item.title.rendered"></h3>
              <!-- <sup>*</sup> -->
            </div>
            <h3 class="mono" v-if="item.parent == 0" v-html="item.title.rendered"></h3>
          </nuxt-link>
        </template>
      </template>
      <template v-else-if="path == 'writing'">
        <template v-for="(item, i) in info">
          <nuxt-link :to="'/'+path+'/'+item.slug" :key="'item-'+i">
            <img
              v-if="item.hasOwnProperty('_embedded')"
              :src="lrgImage(item)"
              :alt="item.title.rendered"
            >
            <h3 class="mono" v-html="item.title.rendered"></h3>
            <span class="date mono">{{$moment(item.date).format('LL') }}</span>
          </nuxt-link>
        </template>
      </template>
      <template v-else>
        <template v-for="(item, i) in info">
          <nuxt-link :to="'/'+path+'/'+item.slug" :key="'item-'+i">
            <img
              v-if="item.hasOwnProperty('_embedded')"
              :src="lrgImage(item)"
              :alt="item.title.rendered"
            >
            <h3 class="mono" v-html="item.title.rendered"></h3>
          </nuxt-link>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: ["info", "path", "children"],
  methods: {
    medImage(i) {
      if (i.hasOwnProperty("_embedded")) {
        if (
          i._embedded["wp:featuredmedia"][0]["media_details"][
            "sizes"
          ].hasOwnProperty("medium")
        ) {
          return i._embedded["wp:featuredmedia"][0]["media_details"]["sizes"][
            "medium"
          ]["source_url"];
        } else {
          return i._embedded["wp:featuredmedia"][0]["source_url"];
        }
      } else {
        return i._embedded["wp:featuredmedia"][0]["source_url"];
      }
    },
    lrgImage(i) {
      if (i.hasOwnProperty("_embedded")) {
        if (
          i._embedded["wp:featuredmedia"][0]["media_details"][
            "sizes"
          ].hasOwnProperty("large")
        ) {
          return i._embedded["wp:featuredmedia"][0]["media_details"]["sizes"][
            "large"
          ]["source_url"];
        } else {
          return i._embedded["wp:featuredmedia"][0]["source_url"];
        }
      } else {
        return i._embedded["wp:featuredmedia"][0]["source_url"];
      }
    },
    check(i) {
      if (i.hasOwnProperty("_embedded")) {
        if (
          i._embedded["wp:featuredmedia"][0]["media_details"][
            "sizes"
          ].hasOwnProperty("medium")
        ) {
          return "yes";
        } else {
          return "no";
        }
      } else {
        return "no 2";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1rem;
}

.date {
  font-size: 0.7rem;
  opacity: 0.5;
}

sup {
  color: #2196f3;
  font-weight: bold;
  font-size: 1rem;
}
@media only screen and (max-width: 1024px) {
  .card-list-container {
    > * {
      margin-bottom: 2rem;
      display: block;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .card-list-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
    margin-bottom: 2rem;
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-list-container {
  > * {
    border: none;
  }
}
</style>