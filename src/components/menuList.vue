<template>
  <div class="menuList-box">
    <template v-if="menuList">
        <el-tabs v-model="first" @tab-click="handleTabChange">
          <template v-for="menu in menuList">
            <el-tab-pane :label="menu.description" :name="menu.code">
              <template v-for="subMenu in menu.children">
                <ym-wrap :name="subMenu.description">
                  <div class="menu-item">
                    <template v-for="lastMenu in subMenu.children" v-if="lastMenu.hidden!==true">
                      <template v-if="lastMenu.children">
                        <template v-for="leafMenu in lastMenu.children" v-if="leafMenu.hidden!==true">
                          <router-link :to="{name:leafMenu.code}">{{leafMenu.description}}</router-link>
                        </template>
                      </template>
                      <template v-else>
                        <router-link :to="{name:lastMenu.code}">{{lastMenu.description}}</router-link>
                      </template>
                    </template>
                  </div>
                </ym-wrap>
              </template>
            </el-tab-pane>
          </template>
        </el-tabs>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
  import config from '../config'

  const storage = window.sessionStorage;
  export default {
    name: 'menuList',
    data() {
      return {};
    },
    computed:{
      menuList(){
        return this.$route.meta.children;
      },
      first:{
        get(){
          if(storage.getItem('menuTabData')){
            let data = JSON.parse(storage.getItem('menuTabData'));
            if(data.name === this.$route.name) return data.index_name;
          }
          return this.$route.meta.children[0].code;
        },
        set(){}
      }
    },
    methods: {
      handleTabChange(menu) {
          let data = JSON.stringify({
          name: this.$route.name,
          index_name: menu.name
        });
        storage.setItem('menuTabData',data);
      },
    }
  };
</script>

<style lang="scss" scoped>

  @import '../style/config.scss';
  .menuList-box{
    background-color: $bg-color-container;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }

  .menu-item {
    overflow: hidden;
    padding: 0 40px;
    a {
      float: left;
      width: 33.33%;
      height: 30px;
      line-height: 30px;
      color: $color-standard;
    }
  }
</style>
