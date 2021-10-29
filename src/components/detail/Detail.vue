<template>
<div class="modalPoke" v-if="showModal">
    <div class="modalPoke_content">
      <div class="modalPoke_header">
         <span class="close" @click="closeModal">x</span>
        <img :src="objPokemon.sprites.front_default" alt="objPokemon.name"> 
      </div>
      <div class="modalPoke_body">
        <p><strong>Name:</strong> {{ objPokemon.name }}</p>
        <p><strong>Weight:</strong> {{ objPokemon.weight }}</p>
        <p><strong>Height:</strong> {{ objPokemon.height }}</p>
        <p><strong>Types:</strong> {{ getTypes }}</p>
      </div>
      <div class="modalPoke_footer">
        <button class="modalPoke_button" @click="toClipboard">Share to my friends</button>
        <span class="star-icon" :class="{ 'active': activePokemon }">
          <font-awesome-icon class="star fa-1x" :icon="['fas', 'star']" />
        </span>
         <!--<PokemonStar @selectedPokemon="selectedPokemon" :activePokemon="isPokemonSelected" />-->
      </div>
    </div>
</div>  
</template>

<script>
import { mapState } from "vuex";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);
library.add(far);
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue';
Vue.use(VueClipboard)

export default {
    name: 'Detail',
    components: {
      FontAwesomeIcon
    },
    data () {
      return {        
        activePokemon: true        
      }
    },
    props: {    
    objPokemon: {
      type: Object,
      default: () => ({
      })
    }    
  },
  computed: {
    ...mapState(['showModal']),
    getTypes () {
        const typesPokemon = this.objPokemon.types.map(({ type }) => type.name);
        return typesPokemon.join(', ');
    },
    getPokemonFeatures () {
      const { name, weight, height } = this.objPokemon;
      return ` ${height }, ${this.getTypes}, ${name}, ${weight}`;
    }
  },
  methods: {
    toClipboard () {
      this.$copyText(this.getPokemonFeatures).then(function (e) {        
        alert('Copy to clipboard')        
      }, function (e) {
        alert('Can not copy')
        console.log(e)
      })
    },
    closeModal () {
      this.$store.commit('sendShowModal', false);
    }
  }
}
</script>

<style scoped lang="scss">
@import "detail";
</style>