<template>
  <div class="panel-wrap">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'container',
    data() {
      return {
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '../style/config.scss';

  .panel-wrap {
    padding: $head-height + $base-spacing $base-spacing $footer-height $sidebar-width + $base-spacing;

    .el-tabs {
      margin-bottom: $base-spacing;
      background-color: $bg-color-container;
    }
  }
</style>
