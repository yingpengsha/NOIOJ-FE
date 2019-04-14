<template>
  <img :src="src || defaultAvator" :width="width" :height="height" />
</template>

<script>
import defaultAvator from '@/assets/public/avator.png';

export default {
  name: 'Avator',
  props: {
    src: {
      type: String,
      default() {
        return defaultAvator;
      },
    },
    width: String,
    height: String,
  },
  data() {
    return {
      defaultAvator,
    };
  },
};
</script>
