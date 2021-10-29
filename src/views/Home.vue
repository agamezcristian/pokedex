<template>
  <div class="pokemon-home">
    <header class="pokemon-home__header">
      <img src="../assets/img/pikachu.png" alt="Pikachu">
    </header>
    <main>
      <h1>Welcome to Pokédex</h1>
      <p class="text-p">The digital encyclopedia created by Professor Oak is an invaluable tool </p>
      <p class="text-s">to Trainers in the Pokémon world.</p>
      <button :class="{ 'active': isActive }" class="buttonPokemon" @click="nextPage">Get started</button>
    </main>
    <Loading :loading="loading"/>
  </div>
</template>

<script>

import Loading from '../components/loading/Loading.vue';
import Service from '../api/Service.js';
export default {
  name: 'Home',
  components: {
    Loading
  },
  data () {
    return {
      loading : false,
      isActive : true
    }
  },
  methods: {
    async nextPage () {
      this.loading = true;
      setTimeout( async () => {
        try {
          Service.pokemonAll().then(resp => {
            const data = resp.data.results;
            this.$store.commit('sendListPokemon', data);            
          });
          
        } catch (e) {
          console.log(e);
        } finally {
          await this.$router.push({path:'/list'});
          this.loading = false;          
        }
      }, 5000);
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import "home";
</style>
