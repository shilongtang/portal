<template>
    <div id="home">
      <canvas id="canvas" class="canvas"></canvas>
    </div>
</template>

<script>
  import {Stats} from './hovertreewelcome';
  export default {
    data(){
      return{
        dialogVisible:false,
        fullScreen: false,

      }
    },
    mounted() {
      const _this = this;
      _this.dialogVisible = true;
      var ctx,  hue, logo,  form,  buffer, target = {}, tendrils = [],  settings = {};
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
              console.log(targetPosition());
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
//          console.log(hue.update(), Math.round(hue.update()), hue.phase, hue.offset, hue.frequency, hue.amplitude);
        }
        for (var i = 0, tendril; i < settings.trails; i++) {
          tendril = tendrils[i];
          tendril.update();
          tendril.draw();
        }
        ctx.frame++;
        ctx.stats.update();
        requestAnimFrame(loop);
      }
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) { window.setTimeout(fn, 1000 / 60) };
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
          target.x = event.clientX - targetPosition().x;
          target.y = event.clientY - targetPosition().y;
        }

        event.preventDefault();
      }
      function targetPosition() {
        return document.getElementById('home').getBoundingClientRect();
      }
      function touchstart(event) {
        if (event.touches.length == 1) {
          target.x = event.touches[0].pageX;
          target.y = event.touches[0].pageY;
        }
      }
      function keyup(event) {
        switch (event.keyCode) {
          case 32:
            save();
            break;
          default:
        }
      }
      function letters(id) {

        var el = document.getElementById(id),
          letters = el.innerHTML.replace('&amp;', '&').split(''),
          heading = '';

        for (var i = 0, n = letters.length, letter; i < n; i++) {
          letter = letters[i].replace('&', '&amp');
          heading += letter.trim() ? '<span class="letter-' + i + '">' + letter + '</span>' : '&nbsp;';
        }

        el.innerHTML = heading;
        setTimeout(function () {
          el.className = 'transition-in';
        }, (Math.random() * 500) + 500);
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
        window.open(buffer.toDataURL(), 'wallpaper', 'top=0,left=0,width=' + buffer.width + ',height=' + buffer.height);
        // form.input.value = buffer.toDataURL().substr(22);
        // form.submit(); hovertree.com
      }
      ctx = document.getElementById('canvas').getContext('2d');
      ctx.stats =  Stats();
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
    /*  console.log(Stats());
      console.log(Stats);
      var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.lineWidth = .3;
      ctx.strokeStyle = (new Color(150)).style;

      // var mousePosition = {
      // 	x: 30 * canvas.width / 100,
      // 	y: 30 * canvas.height / 100
      // };
      var mousePosition = {
        x:  canvas.width - 100,
        y:  canvas.height - 60
      };

      var dots = {
        nb: 250,
        distance: 100,
        d_radius: 150,
        array: []
      };

      function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
      }

      function createColorStyle(r,g,b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
      }

      function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
      }

      function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
          color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
          g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
          b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
      }

      function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
      }

      function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color();
      }

      Dot.prototype = {
        draw: function(){
          ctx.beginPath();
          ctx.fillStyle = this.color.style;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
        }
      };

      function createDots(){
        for(var i = 0; i < dots.nb; i++){
          dots.array.push(new Dot());
        }
      }

      function moveDots() {
        for(var i = 0; i < dots.nb; i++){

          var dot = dots.array[i];

          if(dot.y < 0 || dot.y > canvas.height){
            dot.vx = dot.vx;
            dot.vy = - dot.vy;
          }
          else if(dot.x < 0 || dot.x > canvas.width){
            dot.vx = - dot.vx;
            dot.vy = dot.vy;
          }
          dot.x += dot.vx;
          dot.y += dot.vy;
        }
      }

      function connectDots() {
        for(var i = 0; i < dots.nb; i++){
          for(var j = 0; j < dots.nb; j++){
            var i_dot = dots.array[i];
            var j_dot = dots.array[j];

            if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
              if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                ctx.beginPath();
                ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                ctx.moveTo(i_dot.x, i_dot.y);
                ctx.lineTo(j_dot.x, j_dot.y);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }

      function drawDots() {
        for(var i = 0; i < dots.nb; i++){
          var dot = dots.array[i];
          dot.draw();
        }
      }

      function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        connectDots();
        drawDots();

        requestAnimationFrame(animateDots);
      }

      //----------------------跟着鼠标动--------------------
      document.getElementById('home').addEventListener('mousemove', function(e){
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
      });

      document.getElementById('home').addEventListener('mouseleave', function(e){
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
      });
      //----------------------跟着鼠标动--------------------

      createDots();
      requestAnimationFrame(animateDots);*/
    },
    methods: {
    }
  };
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


</style>
