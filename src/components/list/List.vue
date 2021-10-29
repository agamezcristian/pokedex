<template>
  <div>
    <div>
      <form class="pokemon-search">
        <div class="searchContainer">
          <input v-model="search" type="text"  class="search-input" placeholder="search">          
        </div>
      </form>
    </div>

    <section>
      <div class="pokemon-star-container pokemon-section" v-if="filteredList.length">
        <div  v-for="(item, index) in filteredList" :key="index"  class="pokemon-item">
          <p class="item_name" >  {{item.name}}</p>
          <span :id="index" class="star-icon" :class="{ 'active': activePokemon }" @click="onSelectedItem(item.name, index)">
            <font-awesome-icon class="star fa-1x" :icon="['fas', 'star']" />
          </span>
        </div>
      </div>
      <div v-else >
        <div class="pokemon-alert">
          <p class="pokemon-title">Uh-oh</p>
          <p class="pokemon-text">You look lost on your journey!</p>
          <button  class="buttonPokemon">Go back home</button>
        </div>
      </div>
    </section>
    

    <div class="LayoutDefault">
      <main class="LayoutDefault__main">
        <div class="pokemon-nav">
          <button :class="{ 'enable': isActive }" class="footer-button">
            <font-awesome-icon class="fa-1x" :icon="['fas', 'list']" /> All
          </button>
          <button :class="{ 'enable': !isActive }" class="footer-button" @click="viewFavoritesPokemon">
            <font-awesome-icon class="fa-1x" :icon="['fas', 'star']" /> Favorites
          </button>     
        </div>
      </main>
    </div>

  </div>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
library.add(fas);

import {mapState} from "vuex";

export default {
  name: "List",
  components: {FontAwesomeIcon},
  data () {
    return {
      search : '',
      list: [],
      activePokemon: false,
      isActive: false
    }
  },
  computed: {
    ...mapState(['listPokemon', 'favoritesPokemon']),
    filteredList() {
      return this.listPokemon.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {    
    viewFavoritesPokemon () {
      this.$router.push({path:'/favorites'});
    },
    onSelectedItem (name, index) {
      this.list.push(name);    
      const dataArr = new Set(this.list);
      let result = [...dataArr];
      this.$store.commit('sendFavoritesPokemon', result);
      this.markupFavorite(index);
    },
    markupFavorite ( index ) {
      let element = document.getElementById(index);
      element.classList.contains('active') ? element.className = "star-icon" 
        : element.classList.add("star-icon", "active");      
    }
  }
}
</script>

<style scoped lang="scss">
@import "list";
</style>