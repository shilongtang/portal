<template>
	<div class="loginStyle">
			<div class="back" @click="back()"></div>
		<div class="login-box">
			<div class="logo"></div>
			<form>
				<div class="ipunt-wrap" v-show="admin">
          <div style="float: left;height: 60px"><i style="height: 100%; margin-top: 39px;margin-right: 20px" class="fa fa-id-card-o"></i></div>
          <div style="float: left"><el-input class="ipunt-wrap" id="id"  v-popover:popover1></el-input></div>
          <!--  <input type="text" id="ID" placeholder="账号" v-model="userid">-->
				</div>
				<div class="ipunt-wrap">
          <div style="float: left;height: 60px"><i style="height: 100%; margin-top: 39px;margin-right: 20px" class="fa fa-user-o"></i></div>
          <div style="float: left"><el-input class="ipunt-wrap" id="account"  v-popover:popover2></el-input></div>
        </div>
				<div>
          <div style="float: left;height: 60px"><i style="height: 100%; margin-top: 39px;margin-right: 20px" class="fa fa-key fa-fw"></i></div>
          <div style="float: left"><el-input class="ipunt-wrap" id="password"  v-popover:popover3></el-input></div>
        </div>
				<div class="button">
					<a class="gv" href="javascript:;" @click="submitLogin()">登录</a>
				</div>
				<div class="toregist" v-show="customer">
					还没有账号？<router-link to="/regist"><a href="javascript:;">去注册</a></router-link>
				</div>
			</form>
		</div>
    <el-popover
        style="background: none"
        ref="popover1"
        placement="bottom"
        trigger="click">
      <div class="keyboard1"></div>
    </el-popover>
    <el-popover
        style="background: none"
        ref="popover2"
        placement="bottom"
        trigger="click">
      <div class="keyboard2"></div>
    </el-popover>
    <el-popover
      style="background: none"
      ref="popover3"
      placement="bottom"
      trigger="click">
      <div class="keyboard3"></div>
    </el-popover>
	</div>
</template>

<script>
  import keyboard from './keyboard.min';
  import  audio from './keydown.mp3';
  const storage = window.sessionStorage;
export default {
	components: {},
	props: {
		login: {
			type: Boolean
		},
		admin: {
			type: Boolean
		},
		customer: {
			type: Boolean
		}
	},
	data() {
		return {
			username: '',
			password: '',
			userid: '',
			dialog: false,
		}
	},
  mounted(){
	  console.log(keyboard);
    $('.keyboard1').keyboard({audio:audio});
    $('.keyboard2').keyboard({audio:audio});
    $('.keyboard3').keyboard({audio:audio});
  },
	methods: {
		back() {
      history.go(-1);
			this.$emit('back')
		},
    submitLogin() {

      const _this = this;
			if (_this.admin) {
		/*		if (!_this.userid || !_this.username || !_this.password) {
				//	this.dialog = true
					return
				}*/
				var user = {
					userid: _this.userid,
					username: _this.username,
					password: _this.password
				}
        _this.$store.commit('setUserData', JSON.stringify(user));
        storage.setItem('userData', JSON.stringify(user));
        _this.$router.push({name:"main"})
      }

			if (this.customer) {
				if (!this.username || !this.password) {
					this.dialog = true
					return
				}
				var user = {
					username: this.username,
					password: this.password
				}
			}

		}
	}
}
</script>

<style lang="scss">
  .keyboard1{width:908px;}
  .keyboard2{width:908px;}
  .keyboard3{width:908px;}
.loginStyle{
  position:fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.ipunt-wraplable{
  display: inline-block;
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 10px;
  background-size: cover;
}
.back{
	position: fixed;
	left: 20px;
	top: 20px;
	width: 30px;
	height: 30px;
	background: url('../../assets/images/back.png') no-repeat;
	background-size: cover;
	cursor: pointer;
}
.el-popover {
  position: absolute;
   background: none;
  min-width: 150px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.gv {
	text-decoration: none;
    background: url('../../assets/images/nav_gv.png') repeat 0px 0px;
    width: 130px;
    height: 43px;
    display: block;
    text-align: center;
    line-height: 43px;
    cursor: pointer;
    float: left;
    margin: 10px 2px 10px 2px;
    font: 18px/43px 'microsoft yahei';
    color: #066197;
}
a.gv:hover {
	background: url('../../assets/images/nav_gv.png') repeat 0px -43px;
	color:#1d7eb8;
	-webkit-box-shadow: 0 0 6px #1d7eb8;
	transition-duration: 0.5s;
}

.login-box {
	width: 600px;
	padding: 50px;
	margin: 40px auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	z-index: 100001;
}
.login-box .logo{
	width: 270px;
	height: 108px;
	margin-bottom: 20px;
	background: url('../../assets/images/logo.png') no-repeat;
	background-size: cover;
}
.faaa{
	display: inline-block;
	width: 25px;
	height: 25px;
	vertical-align: middle;
	margin-right: 10px;
	background-size: cover;
}
.icon-id{
	background: url('../../assets/images/id.png') no-repeat;
}
.icon-user{
	background: url('../../assets/images/user.png') no-repeat;
}
.icon-password{
	background: url('../../assets/images/password.png') no-repeat;
}

.ipunt-wrap input{
	border: none;
	outline: none;
	background: none;
	border-bottom: 1px solid #fff;
	width: 200px;
	height: 30px;
	line-height: 30px;
	/* text-align: center; */
	color: #fff;
	font-size: 14px;
	padding: 0 5px;
}
#password {
  float: left;
  border-radius: 0px;
  border: none;
  outline: none;
  margin-top: 30px;
  background: none;
  border-bottom: 1px solid #fff;
  width: 200px;
  height: 30px;
  line-height: 30px;
  /* text-align: center; */
  color: #fff;
  font-size: 14px;
}
#account {
  float: left;
  border-radius: 0px;
  border: none;
  outline: none;
  margin-top: 30px;
  background: none;
  border-bottom: 1px solid #fff;
  width: 200px;
  height: 30px;
  line-height: 30px;
  /* text-align: center; */
  color: #fff;
  font-size: 14px;
}
#id {
  float: left;
  border-radius: 0px;
  border: none;
  outline: none;
  margin-top: 30px;
  background: none;
  border-bottom: 1px solid #fff;
  width: 200px;
  height: 30px;
  line-height: 30px;
  /* text-align: center; */
  color: #fff;
  font-size: 14px;
}
.button {
	margin-top: 30px;
    margin-left: 60px
}
.toregist{
	font-size: 12px;
	float: right;
	padding-top: 20px;
	color: #fff;
}
.toregist a{
	color: #066197;
	text-decoration: none;
}

</style>
