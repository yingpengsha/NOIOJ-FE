<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isLogin',
    ]),
  },
  created() {
    if (this.isLogin) {
      this.$store.dispatch('getAvator');
    }
  },
};
</script>
