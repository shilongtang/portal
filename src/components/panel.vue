<template>
  <div>
    <div class="panel">
      <div class="panel-title">{{pTitle ? pTitle : $route.name}}</div>
      <div class="panel-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name:'panel',
      props: ['pTitle'],
  }
</script>

<style lang="scss">
  @import '../style/config.scss';

  .panel{
    background-color: #fff;
    border: none;
    position: relative;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    .panel-title{
      font-size: $base-font-normal;
      height: 32px;
      line-height: 32px;
      padding: 0 20px;
      border-bottom: 1px solid #ebf1f3;
    }
    .panel-body{
      padding: 20px;
      padding-bottom: 10px;
    }
  }
</style>
