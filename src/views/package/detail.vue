<template>
  <div>
    
  </div>
</template>

<script>
import * as packageAPI from '@/api/package';
import * as problem from '@/api/problem';

export default {
  name: 'PackageDetail',
  data() {
    return {
      infoLoading: true,
      listLoading: true,
      info: {},
      list: [],
    };
  },
  computed: {
    packageId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getInfo() {
      packageAPI.queryById(this.packageId)
        .then((result) => {
          console.log(result);
        });
    },
    getList() {

    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>

</style>
