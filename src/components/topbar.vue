<template>
  <header class="gc-topbar">
    <div class="logo">
      <router-link to="/index">
        <img src="../assets/logo.png"/>
      </router-link>
    </div>
    <div class="nav-box">
      <span v-if="locale == 'zh'" class="title">汤世龙test</span>
      <div class="right nav-icon">
        <a href="javascript: void(0);">
          <i class="fa fa-language"></i>
      <!--    <el-select class="language" v-model="language" size="small" @change="languageChange" placeholder="中 文">
            <el-option
              v-for="item in languageList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>-->
        </a>
        |
        <a href="javascript: void(0);">
          <i class="fa fa-user-circle-o"></i>
         <!-- <ymp-org @change="saveState" :showText="true" :global="true" @go="goIndex" widthValue="220"></ymp-org>-->
        </a>
        |
        <div style="float: right" @mouseenter="enter" @mouseleave="leave">
          <ul class="currentUser">
            <li>
              <a href="javascript: void(0);"><i class="fa fa-sign-out"></i>{{currentUser}}</a>
            </li>
          </ul>
          <ul class="select" :class="{'default': Aoo, 'inlink': Boo}">
            <li>
              <a v-if="locale == 'zh'"  href="javascript: void(0);" @click="logout"><i class="icon icon-nav-my-login-out"></i>退出</a>
              <a v-if="locale == 'en'"  href="javascript: void(0);" @click="logout" style="margin-left:-10px; text-align: center">SignOut</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'topbar',
    components: {},
    data() {
      return {
        Aoo: true,
        Boo: false,
        currentUser:'',
        languageList: [{
          value: 'CN',
          label: '中 文'
        }, {
          value: 'EN',
          label: 'English',
        }],
        language: ''
      }
    },
    computed: {
      locale:{
        // getter
        get: function () {
          return this.$i18n.locale
        },
        // setter
        set: function (newValue) {
          this.$i18n.locale = newValue;
        }
      },
    },
    mounted(){
      const _this = this;
      let user = _this.getUser();
      _this.currentUser = user;
    },
    methods: {
      languageChange(value) {
        if (value == 'CN') {
          this.$i18n.locale = 'zh'
          window.sessionStorage.setItem('language', 'zh')
        } else if (value == 'EN') {
          this.$i18n.locale = 'en'
          window.sessionStorage.setItem('language', 'en')
        }
      },
      saveState(data,node,component){
        this.$store.commit('currCityCompany/setValue',data.id);
      },
      goIndex(){
        this.$router.push('/')
      },
      logout(){
        const _this = this;
        let date=new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = "currentUser=''"+";expires="+date.toGMTString();
        _this.$router.push('/login'); //跳转到登录页
      },
      getUser() {
        let cookieName = "currentUser";
        let theCookie = "" + document.cookie;
        let ind = theCookie.indexOf(cookieName);
        if(ind==-1 || cookieName=="") return "";
        var ind1 = theCookie.indexOf(';',ind);
        if(ind1==-1) ind1 = theCookie.length;
        /*读取Cookie值*/
        return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
      },
      enter () {
        const _this = this
        _this.Aoo = false
        _this.Boo = true
      },
      leave () {
        const _this = this
        _this.Aoo = true
        _this.Boo = false
      }
    },
  };
</script>

<style lang="scss">
  @import '../style/config.scss';

  .gc-topbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: $head-height;
    width: 100%;
    /*overflow: hidden;*/
    padding: 0px 15px;
    background-color: $bg-color-container;
    border: 0 !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    .logo {
      float: left;
      height: $head-height;
      line-height: 48px;
      width: 140px;
      font-size: 28px;
      text-align: center;
      img {
        height: 38px;
        margin-top: 8px;
      }
    }
    .nav-box {
      height: 100%;
      line-height: $head-height;
      /*overflow: hidden;*/
      font-size: $font-size-keynote;
      .title {
        color: $font-color-keynote;
        margin-left: 10px;
        padding-left: 20px;
        border-left: 1px solid $border-color;
      }
      .nav-icon {
        a {
          display: inline-block;
          padding: 0 14px;
          color: $font-color-standard;
          text-decoration: none;
          &:hover {
            color: $color-standard;
          }
        }
        i {
          color: $color-standard;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
    .inlink {
      position: absolute;
      top:36px;
      box-shadow: 0 0 3px #000;
      margin-top: 12px;
      .currentUser {
        li {
          /*margin-top: 12px;*/
        }
      }
      li {
        height:40px;
        line-height: 40px;
        width: 100px;
        /*background-color: rgb(249,249,249);*/
        /*border-bottom: 1px solid #e5e5e5;*/
        background-color: #fff;
      }
    }
    .default {
      display: none;
      li {
        width: 100px;
      }
      .select {
        display: none;
      }
    }
    .language {
      width: 60px;

      input {
        border: none;
        padding-right: 0;
        font-size: 14px;
        color: #9f9f9f;
      }
      input:hover {
        color: $color-standard;
      }
      i {
        display: none;
      }
    }
  }
</style>
