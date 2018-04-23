<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',
  }
</script>

<style lang="scss">
  //@import './assets/fonts/iconfont.css';
  @import './style/reset.scss';
  @import './style/common.scss';

  #app{
    height: 100%;
    width: 100%;
    min-width: 900px;
  }
</style>
