<template>
  <el-menu :default-active="active"
             class="gc-sidebar"
             mode="vertical"
             :collapse="false">

      <template v-for="item1 in menu">

        <template v-if="!item1.hidden ">

          <template v-if="item1.children">

            <el-submenu :index="item1.code">

              <template slot="title">
                <i v-if='item1.icon' class="fa" :class="item1.icon"></i>
                <span slot="title">{{locale == 'en'? item1.foreignLanguageDescription : item1.description}}</span>
              </template>

              <template v-for="item2 in item1.children">

                <template v-if="!item2.hidden ">

                  <template v-if="item2.children">

                    <el-submenu :index="item2.code">

                      <span slot="title" class="el-submenu__title-2">{{locale == 'en'? item2.foreignLanguageDescription : item2.description}}</span>

                      <template v-for="item3 in item2.children">

                        <template v-if="!item3.hidden ">

                            <el-menu-item :index="item3.code"  class="el-menu-item-3">
                              <span slot="title"><router-link
                                :to="{name:item3.code}">{{ locale == 'en'? item3.foreignLanguageDescription : item3.description}}</router-link></span>
                            </el-menu-item>

                        </template>

                      </template>

                    </el-submenu>

                  </template>

                  <template v-else>
                    <el-menu-item :index="item2.code" class="el-menu-item-2">
                      <span slot="title"><router-link :to="{name:item2.code}">{{locale == 'en'? item2.foreignLanguageDescription : item2.description}}</router-link></span>
                    </el-menu-item>
                  </template>

                </template>
              </template>


            </el-submenu>

          </template>

          <template v-else>
            <el-menu-item :index="item1.code||''"  class="el-menu-item-1">
              <i v-if='item1.icon' class="fa" :class="item1.icon"></i>
              <span slot="title"><router-link :to="{name:item1.code}">{{locale == 'en'? item1.foreignLanguageDescription : item1.description}}</router-link></span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
</template>

<script>

  import config from '../config'

  export default {
    name: 'hotMenu',
    data() {
      return {};
    },
    computed: {
      locale(){
        return this.$i18n.locale

      },
      menu() {
        return this.$router.options.routes[0].children;
      },
      active(){
        const paths = this.$route.path.split('/');
        if(paths.length>config.menuLevel+2){
          return paths[config.menuLevel+1];
        }else{
          return this.$route.name;
        }
      }
    },
  };
</script>

<style lang="scss">
  @import '../style/config.scss';

  .gc-sidebar{
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
    overflow-y: scroll;
    font-size: $font-size-standard;
    background-color: #fff;
    a{
      color: #48576a;
    }
    .el-submenu__icon-arrow{
      margin-top: -4px;
      font-size: 12px;
      transform: scale(.6);
      -webkit-transform: scale(.6);
    }
    .el-icon-arrow-down:before{
      content: "\E604";
    }
    @for $i from 1 through 3 {
      .el-menu-item-#{$i} {
        @if $i == 3{
          height: 32px;
          line-height: 32px;
        }@else{
          height: 54px - $i * 6px;
          line-height: 54px - $i * 6px;
        }
        a{padding-left: 20px * $i + 10px;
          font-size: 12px;
        }
      }
    }

    .el-submenu.is-opened{
      > .el-submenu__title{
        .el-submenu__icon-arrow{
          margin-top: -4px;
          font-size: 12px;
          transform: scale(.6) rotateZ(180deg)!important;
          -webkit-transform: scale(.6) rotateZ(180deg)!important;
        }
      }
    }
    > .el-submenu.is-opened{
      overflow-x: hidden;
      background-color: #eff6ff;
      > .el-submenu__title{
        color: $color-standard;
      }
      .el-menu{
        background-color: #eff6ff;
      }
    }
  }
  .el-submenu{
    .el-submenu__title{
      height: 48px;
      line-height: 48px;
      font-size: $font-size-standard;
      &:hover{
        color: $color-standard;
        background-color: transparent!important;
      }
    }
    .el-submenu{
      .el-submenu__title{
        height: 42px;
        line-height: 42px;
      }
      .el-submenu__title-2 {
        padding-left: 20px;
      }
    }
  }
  .el-menu-item * {
    vertical-align: inherit;
  }
  .el-menu-item-3, el-menu-item-2{
    position: relative;
    font-size: $font-size-standard;
    span,a{
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      height: 100%;
      width: 100%;
    }
    &:hover{
      background-color: transparent!important;
      a{color: $color-standard;}
    }
  }
  .el-menu-item-1 {
    position: relative;
    font-size: $font-size-standard;
    span, a {
      font-size: 12px;
      padding-left: 0!important;
    }
  }
  .el-menu-item-2 {
    a {
      padding-left: 20px!important;
    }
  }
  .el-menu-item.is-active a{
    color: $color-standard;
  }
  .fa {
    margin-right: 5px;
    width: 20px;
    font-size: 15px;
  }

</style>
