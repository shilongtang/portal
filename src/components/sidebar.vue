<template>
  <div class="gc-sidebar-wrap">
    <hot-menu></hot-menu>
  </div>
</template>

<script>

  import Menu from './menu';
  import {mapGetters} from 'vuex';


  export default {
    name: 'sidebar',
    components: {'hot-menu': Menu},
    data() {
      return {};
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/config.scss';

  .gc-sidebar-wrap {
    position: fixed !important;
    top: $head-height;
    width: $sidebar-width;
    left: 0;
    bottom: 0;
    z-index: 90;
    overflow: hidden;
    color: #9f9f9f;
    background-color: $bg-color-container;
    box-shadow: 1px 0 1px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 1px 0 1px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 1px 0 1px rgba(0, 0, 0, 0.05);
  }
</style>
