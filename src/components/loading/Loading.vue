<template>
  <div id="overlay" v-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './loading';

</style>
