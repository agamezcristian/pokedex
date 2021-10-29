<template>
  <div>
    <div>
      <form class="pokemon-search">
        <div class="searchContainer">
          <input v-model="search" type="text"  class="search-input" placeholder="search">
        </div>
      </form>
    </div>

    <section >
      <div class="pokemon-star-container pokemon-section" v-if="filteredFavoriteList.length">
        <div v-for="(item, index) in filteredFavoriteList" :key="index"  class="pokemon-item">
          <p class="item_name" >  {{item}}</p>
          <span class="star-icon" :class="{ 'active': activePokemon }" @click="onSelectedFavorite(item)">
            <font-awesome-icon class="star fa-1x" :icon="['fas', 'star']" />
          </span>
        </div>
      </div>
      <div v-else>
        <div class="pokemon-alert">
          <p class="pokemon_title">Uh-oh</p>
          <p class="pokemon_text">You look lost on your journey!</p>
          <button class="buttonPokemon" @click="viewHome"  >Go back home</button>
        </div>
      </div>
    </section>
    
    <div class="LayoutDefault">
      <main class="LayoutDefault__main">
        <div class="pokemon-nav">
          <button :class="{ 'enable': !isActive }" class="footer-button" @click="viewAllPokemon">
            <font-awesome-icon class="fa-1x" :icon="['fas', 'list']" /> All
          </button>
          <button :class="{ 'enable': isActive }" class="footer-button">
             <font-awesome-icon class="fa-1x" :icon="['fas', 'star']" /> Favorites
          </button>
        </div>
      </main>
    </div>
    <Detail :objPokemon="objPokemon"/>
  </div>
</template>

<script>

import {mapState} from "vuex";
import Service from '@/api/Service.js';
import Detail from '@/components/detail/Detail.vue';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
library.add(fas);
 

export default {
  name: "Favorite",
  components: {
    Detail,
    FontAwesomeIcon
  },
  data () {
    return {
      search : '',      
      objPokemon: {},
      isActive: false,
      activePokemon: true
    }
  },
  computed: {
    ...mapState(['favoritesPokemon']),
    filteredFavoriteList() {
      return this.favoritesPokemon.filter(post => {
        return post.toLowerCase().includes(this.search.toLowerCase())
      })
    }
    
  },
  methods: {
    viewAllPokemon () {
      this.$router.push({path:'/list'});
    },
    viewHome () {
      this.$router.push({path:'/'});
    },
    async onSelectedFavorite (name) {
        try {
          this.$store.commit('sendShowModal', true);
          const { data } = await Service.pokemon(name);
          this.objPokemon = data;
        } catch (error) {
          console.log(error);
        } 
    }
  }
}
</script>

<style scoped lang="scss">
@import "favorite";
</style>