<template>
    <div id="home">
      <canvas id="canvas" class="canvas"></canvas>
      <transition name="fade-out">
        <div v-show="!login">
          <div class="logo-bg"></div>
          <div class="nav">
            <router-link to="/customer-login">
              <a class="gv" href="javascript:;" @click="customerLogin()">客户登录</a>
            </router-link>
            <router-link :to="{name:nameList.menu_1,params:{id:1}}">
              <a class="gv" href="avascript:;" @click="adminLogin()">管理员登录</a>
            </router-link>
          </div>
        </div>
      </transition>

      <transition name="fade-in">
        <router-view  :customer="customer" :login="login" @back="back" :admin="admin"></router-view>
      </transition>
      <div class="city"></div>
      <div class="moon"></div>
    </div>
</template>

<script>
  import {Stats} from './hovertreewelcome';
  import Moon from './Moon'
  import Star from './Star'
  import Meteor from './Meteor'
  import nameList from './constant';
  const storage = window.sessionStorage;
  import {mapMutations} from 'vuex';
  export default {
    data(){
      return {
        nameList,
        login: false,
        customer: false,
        admin: false,
        initTrue: true

      }
    },
    mounted() {
      const _this = this;
      //流星特效
      _this.meteor();
      //宇宙特效
      _this.universe();
      //鼠标跟随特效
      //_this.follow();
      // const _this = this;
      var ctx, hue, logo, form, buffer, target = {}, tendrils = [], settings = {};
      settings.debug = true;
      settings.friction = 0.5;
      settings.trails = 20;
      settings.size = 50;
      settings.dampening = 0.25;
      settings.tension = 0.98;

      Math.TWO_PI = Math.PI * 2;

      // ========================================================================================
      // Oscillator 何问起
      // ----------------------------------------------------------------------------------------

      function Oscillator(options) {
        this.init(options || {});
      }

      Oscillator.prototype = (function () {
        var value = 0;
        return {
          init: function (options) {
            this.phase = options.phase || 0;
            this.offset = options.offset || 0;
            this.frequency = options.frequency || 0.001;
            this.amplitude = options.amplitude || 1;
          },
          update: function () {
            this.phase += this.frequency;
            value = this.offset + Math.sin(this.phase) * this.amplitude;
            return value;
          },
          value: function () {
            return value;
          }
        };
      })();

      // ========================================================================================
      // Tendril hovertree.com
      // ----------------------------------------------------------------------------------------

      function Tendril(options) {
        this.init(options || {});
      }

      Tendril.prototype = (function () {
        function Node() {
          this.x = 0;
          this.y = 0;
          this.vy = 0;
          this.vx = 0;
        }

        return {
          init: function (options) {
            this.spring = options.spring + (Math.random() * 0.1) - 0.05;
            this.friction = settings.friction + (Math.random() * 0.01) - 0.005;
            this.nodes = [];
            for (var i = 0, node; i < settings.size; i++) {
              node = new Node();
              node.x = target.x;
              node.y = target.y;
              this.nodes.push(node);
            }
          },
          update: function () {
            var spring = this.spring,
              node = this.nodes[0];
            node.vx += (target.x - node.x) * spring;
            node.vy += (target.y - node.y) * spring;
            for (var prev, i = 0, n = this.nodes.length; i < n; i++) {
              node = this.nodes[i];
              if (i > 0) {
                prev = this.nodes[i - 1];
                node.vx += (prev.x - node.x) * spring;
                node.vy += (prev.y - node.y) * spring;
                node.vx += prev.vx * settings.dampening;
                node.vy += prev.vy * settings.dampening;
              }
              node.vx *= this.friction;
              node.vy *= this.friction;
              node.x += node.vx;
              node.y += node.vy;
              spring *= settings.tension;
            }
          },
          draw: function () {
            var x = this.nodes[0].x,
              y = this.nodes[0].y,
              a, b;
            ctx.beginPath();
            ctx.moveTo(x, y);
            for (var i = 1, n = this.nodes.length - 2; i < n; i++) {
              a = this.nodes[i];
              b = this.nodes[i + 1];
              x = (a.x + b.x) * 0.5;
              y = (a.y + b.y) * 0.5;
              ctx.quadraticCurveTo(a.x, a.y, x, y);
            }
            a = this.nodes[i];
            b = this.nodes[i + 1];
            ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
            ctx.stroke();
            ctx.closePath();
          }
        };
      })();

      // ----------------------------------------------------------------------------------------

      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame
          || window.mozRequestAnimationFrame || function (fn) {
            window.setTimeout(fn, 1000 / 60)
          };
      })();
      function resize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }

      function start() {
        if (!ctx.running) {
          ctx.running = true;
          loop();
        }
      }

      function stop() {
        ctx.running = false;
      }

      function mousemove(event) {
        if (event.touches) {
          target.x = event.touches[0].pageX;
          target.y = event.touches[0].pageY;
        } else {
          target.x = event.clientX;
          target.y = event.clientY;
        }

        event.preventDefault();
      }

      function reset() {
        tendrils = [];
        for (var i = 0; i < settings.trails; i++) {
          tendrils.push(new Tendril({
            spring: 0.45 + 0.025 * (i / settings.trails)
          }));
        }
      }

      function loop() {
        if (!ctx.running) return;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(8,5,16,0.4)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'hsla(' + Math.round(hue.update()) + ',90%,50%,0.25)';
        ctx.lineWidth = 1;
        if (ctx.frame % 60 == 0) {
          console.log(hue.update(), Math.round(hue.update()), hue.phase, hue.offset, hue.frequency,
            hue.amplitude);
        }
        for (var i = 0, tendril; i < settings.trails; i++) {
          tendril = tendrils[i];
          tendril.update();
          tendril.draw();
        }
        ctx.frame++;
        ctx.stats.update();
        if (_this.initTrue) {
          requestAnimFrame(loop);
        }
      }

      function touchstart(event) {
        if (event.touches.length == 1) {
          target.x = event.touches[0].pageX;
          target.y = event.touches[0].pageY;
        }
      }

      function init(event) {
        document.removeEventListener('mousemove', init);
        document.removeEventListener('touchstart', init);
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('touchmove', mousemove);
        document.addEventListener('touchstart', touchstart);
        mousemove(event);
        reset();
        loop();
      }

      function keyup(event) {
        switch (event.keyCode) {
          case 32:
            save();
            break;
          default:
        }
      }

      function save() {
        if (!buffer) {
          buffer = document.createElement('canvas');
          buffer.width = screen.availWidth;
          buffer.height = screen.availHeight;
          buffer.ctx = buffer.getContext('2d');
          form = document.createElement('form');
          form.method = 'post';
          form.input = document.createElement('input');
          form.input.type = 'hidden';
          form.input.name = 'data';
          form.appendChild(form.input);
          document.body.appendChild(form);
        }
        buffer.ctx.fillStyle = 'rgba(8,5,16)';
        buffer.ctx.fillRect(0, 0, buffer.width, buffer.height);
        buffer.ctx.drawImage(canvas,
          Math.round(buffer.width / 2 - canvas.width / 2),
          Math.round(buffer.height / 2 - canvas.height / 2)
        );
        buffer.ctx.drawImage(logo,
          Math.round(buffer.width / 2 - logo.width / 4),
          Math.round(buffer.height / 2 - logo.height / 4),
          logo.width / 2,
          logo.height / 2
        );
        window.open(buffer.toDataURL(), 'wallpaper',
          'top=0,left=0,width=' + buffer.width + ',height=' + buffer.height);
      }

      ctx = document.getElementById('canvas').getContext('2d');
      ctx.stats = Stats();
      ctx.running = true;
      ctx.frame = 1;
      hue = new Oscillator({
        phase: Math.random() * Math.TWO_PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285
      });
      document.addEventListener('mousemove', init);
      document.addEventListener('touchstart', init);
      document.body.addEventListener('orientationchange', resize);
      window.addEventListener('resize', resize);
      window.addEventListener('keyup', keyup);
      window.addEventListener('focus', start);
      window.addEventListener('blur', stop);
      resize();
      if (window.DEBUG) {
        var gui = new dat.GUI();
        settings.gui.add(settings, 'trails', 1, 30).onChange(reset);
        settings.gui.add(settings, 'size', 25, 75).onFinishChange(reset);
        settings.gui.add(settings, 'friction', 0.45, 0.55).onFinishChange(reset);
        settings.gui.add(settings, 'dampening', 0.01, 0.4).onFinishChange(reset);
        settings.gui.add(settings, 'tension', 0.95, 0.999).onFinishChange(reset);
        document.body.appendChild(ctx.stats.domElement);
      }
    },

    methods: {

      meteor(){
        let canvas4 = document.getElementById('canvas'),
          ctx3 = canvas4.getContext('2d'),
          width = window.innerWidth,
          height = window.innerHeight,
          //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
          moon = new Moon(ctx3, width, height),
          stars = new Star(ctx3, width, height, 200),
          meteors = [],
          count = 0

        canvas4.width = width;
        canvas4.height = height;

        const meteorGenerator = ()=> {
          //x位置偏移，以免经过月亮
          let x = Math.random() * width + 800
          meteors.push(new Meteor(ctx3, x, height))

          //每隔随机时间，生成新流星
          setTimeout(()=> {
            meteorGenerator()

          }, Math.random() * 2000)
        }

        const frame = ()=>{
          count++
          count % 10 == 0 && stars.blink()
          moon.draw()
          stars.draw()

          meteors.forEach((meteor, index, arr)=> {
            //如果流星离开视野之内，销毁流星实例，回收内存
            if (meteor.flow()) {
              meteor.draw()
            } else {
              arr.splice(index, 1)
            }
          })
          requestAnimationFrame(frame)
        }
        meteorGenerator()
        frame()
      },
      follow(){

      },
      universe(){
        const _this = this;
        var ctx;
        ctx = document.getElementById('canvas').getContext('2d');
        w = window.innerWidth;
        h = window.innerHeight;
        hue2 = 230,//230
          stars = [],
          count = 0,
          maxStars = 1000;//星星数量

        var canvas2 = document.createElement('canvas'),
          ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width / 2,
          gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue2 + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue2 + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

// End cache

        function random(min, max) {
          if (arguments.length < 2) {
            max = min;
            min = 0;
          }

          if (min > max) {
            var hold = max;
            max = min;
            min = hold;
          }

          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
          var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
          return diameter / 2;
          //星星移动范围，值越大范围越小，
        }

        var Star = function() {

          this.orbitRadius = random(maxOrbit(w, h));
          this.radius = random(60, this.orbitRadius) / 8;
          //星星半径大小
          this.orbitX = w / 2;
          this.orbitY = h / 2;
          this.timePassed = random(0, maxStars);
          this.speed = random(this.orbitRadius) / 50000;
          //星星移动速度
          this.alpha = random(2, 10) / 10;

          count++;
          stars[count] = this;
        }

        Star.prototype.draw = function() {
          var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

          if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
          } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
          }

          ctx.globalAlpha = this.alpha;
          ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
          this.timePassed += this.speed;
        }

        for (var i = 0; i < maxStars; i++) {
          new Star();
        }

        function animation() {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.5; //尾巴
          ctx.fillStyle = 'hsla(' + hue2 + ', 64%, 6%, 2)';
          ctx.fillRect(0, 0, w, h)

          ctx.globalCompositeOperation = 'lighter';
          for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
          };
          if(_this.initTrue){
            window.requestAnimationFrame(animation);
          }

        }

        animation();
      },
      //...mapMutations({setData: 'setUserData'}),
      customerLogin() {
        this.login = true
        this.customer = true

      },
      adminLogin() {
        this.login = true;
        const _this = this;
       // _this.setData({id:"adsd"});

       // _this.initTrue = false;
        this.$store.commit('setUserData', JSON.stringify(new Date()));
        //this.$store.commit('setUserData',JSON.stringify(new Date()));
       //storage.setItem('userData', JSON.stringify(new Date()));
        this.admin = true;
      },
      back() {
        this.login = false
        this.customer = false
        this.admin = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  #home{
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    /* box-sizing: border-box; */
    overflow-x: hidden;
    background: rgba(7,17,27,0.95);
  }
  .canvas {
    position: fixed;
    z-index: 0;
  }
  .full-container {
    //background: rgb(232, 64, 80);
    overflow: hidden;
    position: relative;
    font-size: 14px;
    //color: #000000;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-size: cover;
    .main-container {
      width: 100%;
      border-top: solid 1px #fff;
      display: flex;
      display: -webkit-flex;
      display: -ms-flex;
      margin-top: 5px;
      border-top: 1px solid #fdd100;
      aside {
        flex: 1;
        -webkit-flex: 1;
        -webkit-box-flex: 1;
        border-left: solid 1px #fdd100;
        min-width: 300px;
        min-height: 500px;
        ul {
          margin-top: 15px;
          overflow: auto;
          display: block;
          li {
            position: relative;
            padding-left: 50px;
            margin-bottom: 15px;
            text-align: justify;
            &:last-child {
              margin-bottom: 0;
            }
            i {
              position: absolute;
              left: 0;
              font-size: 1.6em;
              border: solid 2px #fff;
              width: 36px;
              height: 36px;
              overflow: hidden;
              border-radius: 20px;
              text-align: center;
              line-height: 30px;
            }
          }
        }
      }
      .building-container {
        flex: 4;
        -webkit-flex: 4;
        -webkit-box-flex: 4;
        margin-right: 15px;
        overflow: auto;
        //overflow: auto;
        .building-cell {
          display: block;
          text-align: center;
          margin: 10px 0;
          font-size: medium;
          font-weight: bold;
          width: 100%;
          line-height: 30px;
          height: 30px;
          border-radius: 15px;
        }
        .floor-block {
          display: flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: -moz-flex;

        }
        .room-cell {
          flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          -moz-box-flex: 1;
        }
        .room-cell-item {
          margin-right: 5px;
          display: inline-block;
          text-align: center;
          margin-bottom: 5px;
        }
        .floor-cell {
          text-align: center;
          padding: 0px 5px;
          width: 50px;
          min-width: 50px;
          margin-right: 5px;
          display: inline-block;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
        }

      }
      .online-number {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }
  }
  .logo-bg {
    width: 800px;
    height: 200px;
    position: absolute;
    z-index: 10000;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: url('../../assets/images/top_logo.png') no-repeat;
  }
  .logo-bg1 {
    width: 800px;
    height: 200px;
    position: absolute;
    z-index: 10000;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    font: 18px/43px 'microsoft yahei';
   // color: rgb(25,156,196);
    color: rgb(25,137,171)
  }
  .nav {
    width: 200px;
    height: auto;
    position: absolute;
    z-index: 10000;
    top: 350px;
    left: 50%;
    margin-left: -100px;
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
  .city {
    width: 100%;
    height: 170px;
    position: fixed;
    bottom: 0px;
    z-index: 100;
    background: url('../../assets/images/city.png') no-repeat;
    background-size: cover;
  }
  .moon {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 100px;
    top: 100px;
    background: url('../../assets/images/moon.png') no-repeat;
    background-size: cover;
  }
  .fade-out-enter-active, .fade-out-leave-active {
    transition: all .5s
  }
  .fade-out-enter, .fade-out-leave-active {
    opacity: 0;
    transform: translateX(-400px);
  }

  .fade-in-enter-active, .fade-in-leave-active {
    transition: all .5s
  }
  .fade-in-enter, .fade-in-leave-active {
    opacity: 0;
    transform: translateX(400px);
  }
</style>
