<template>
  <div>
      <topbar></topbar>
      <sidebar></sidebar>
      <container></container>
      <footbar></footbar>
  </div>
</template>

<script>
  import topbar from './topbar'
  import sidebar from './sidebar'
  import footbar from './footbar'
  import container from './container'

  export default {
    name: 'layout',
    components: {topbar, sidebar, footbar,container},

    mounted(){

    }
  }
</script>
<style>
  /*#home{
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    !* box-sizing: border-box; *!
    overflow-x: hidden;
    background: rgba(7,17,27,0.95);
  }*/
  .canvas {
    position: fixed;
    z-index: 1;
  }
</style>

