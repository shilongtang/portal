<template>
  <footer><a  href="http://www.miitbeian.gov.cn/" class="">粤ICP备18041597号</a></footer>
</template>

<script>
  export default {
    name:'footbar'
  }
</script>

<style lang="scss" scoped>
    @import '../style/config.scss';

    footer{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      height: $footer-height;
      padding: 12px;
      text-align: center;
      color: $font-color-standard;
      margin-left: 180px;
    }
</style>
