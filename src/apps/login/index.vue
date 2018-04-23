<template>
  <div class="login-bg">
    <div class="login-wrap">
      <h3></h3>
      <el-form :model="user" :rules="rules" ref="user">
        <el-form-item prop="account" class="account">
          <el-input type="text" placeholder="请输入用户名" v-model="user.account" @keyup.enter.native="login"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="password">
          <el-input type="password" placeholder="请输入密码" v-model="user.password" @keyup.enter.native="login"
                    class="password"></el-input>
        </el-form-item>
      </el-form>

      <div class="login-btn">
        <el-button type="primary" class="login-btn" @click="login">登　录</el-button>
      </div>
    </div>

    <div class="login-bottom">
      <a href="javascript: void(0)">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524496312140&di=decf500e69b72262854715628cbc9ef9&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0142135541fe180000019ae9b8cf86.jpg%401280w_1l_2o_100sh.png" alt="有明云平台"/>
      </a>

      <p>
        业务热线：010-85187166      关注微博：@有明吉博      关注公众号：grandinsight2013
        <br/>
        © 2017 有明云 版权所有      沪ICP备14050116号 - 1
      </p>
    </div>
  </div>
</template>

<script>

  import {login} from './api';
  import {mapGetters} from 'vuex';

  const storage = window.sessionStorage;

  export default {
    data() {
      return {
        input: '',
        account: '',
        password: '',
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
        },
        user: {},
      };
    },
    mounted() {
      const _this = this;
    },
    ...mapGetters({
      setData: 'setUserData',
    }),
    methods: {
      login() {
        const _this = this;
        _this.$refs['user'].validate((valid) => {
          if (valid) {
          /*  useraccountsvc_login(config.btns.index_Login.page,config.btns.index_Login.chineseName,_this.user).then(result=>{
              if (result.body === -1) {
                _this.$message('该用户不存在！');
              } else if (result.body == 0) {
                _this.$message('密码错误！');
              } else {
                storage.setItem('userData', JSON.stringify(result.body));
//                _this.setData();
                var date = new Date();
                date.setTime(date.getTime() + 300 * 60 * 1000); //设置date为当前时间+30分
                document.cookie = 'currentUser=' + _this.user.account + ';expires=' + date.toGMTString();
                _this.$router.push('/index'); //跳转到首页
              }
            }).catch(error=>{
              _this.$message('登录异常！');
            })*/
          }else{
            _this.$message('xxxxxx！');
          }
        });
      }
    },
  };
</script>


<style lang="scss" scoped>
</style>
