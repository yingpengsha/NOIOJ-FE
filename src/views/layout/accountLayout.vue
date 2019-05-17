<template>
  <div id="layout">
    <nav-bar />

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from './components/navBar.vue';

export default {
  name: 'Layout',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
#layout{
  height: 100%;
  width: 100%;

  main{
    width: 100%;
    height:calc(100% - 60px);
  }

  footer{
    width: 100%;
    height: 100px;
    text-align: center;
    background: $grayBack;
    main{
      width: $mainWidth;
      margin: auto;
      border-top: 1px solid gray;
      .logo{
        width: 40px;
        height: 60px;
        margin: auto;
        padding: 15px 0;
        .icon{
          fill: $black;
          width: 40px;
          height: 30px;
        }
      }
      span{
        color: $black;
        font-size: 14px;
      }
    }
  }
}
</style>
