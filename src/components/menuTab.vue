<template>
  <div class="menuTab-box">
    <el-tabs @tab-click="handleTabChange" v-model="checkCode" v-show="!tabShow">
      <template v-for="menu in menuList" v-if="menu.hidden!==true">
        <el-tab-pane :label="menu.description" :name="menu.code">

        </el-tab-pane>
      </template>
      <router-view></router-view>
    </el-tabs>

    <template v-if="tabShow">
      <router-view></router-view>
    </template>
  </div>
</template>

<script>

  export default {
    name: 'menuTab',
    data() {
      return {
          tabShow: false
      };
    },
    computed: {
      menuList() {
        if(this.$route.meta.children){
          return this.$route.meta.children;
        }else{
          return this.$route.meta.parent.children;
        }
      },
      checkCode:{
        get(){
            let name = this.$route.name.split(/[-_]/);
            if(name.length > 1) {
                this.tabShow = true
            }else{
                this.tabShow = false;
            }
            return this.$route.name
        },
        set(){}
      }
    },
    methods: {
      handleTabChange(menu) {
        this.$router.push({name: menu.name});
      },
    }
  };
</script>

<style lang="scss">
  @import '../style/config.scss';

  .menuTab-box{
    > div{
      > .el-tabs__header{
        background-color: $bg-color-container;
      }
    }
  }
</style>
