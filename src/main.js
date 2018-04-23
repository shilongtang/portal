// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueI18n from 'vue-i18n';
import elementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'expose-loader?_!lodash';
import 'font-awesome/css/font-awesome.min.css';
import Panel from './components/panel.vue'; // 项目容器组件
Vue.config.productionTip = false
Vue.use(vueI18n);
Vue.use(elementUI);
Vue.component('panel', Panel);
function lang () {
// 将选择的语言存在localStorage中
  let t = window.sessionStorage.getItem('language')
  if (t) return t
  // 默认中文
  else return 'zh'
}
const language = lang()
// 自定义 window 的 lang 属性
window.lang = lang()
const messages = {
  en: {
    //...en,
    // ...enLocale
  },
  zh: {
   // ...zh,
    // ...zhLocale
  }
}
const i18n = new vueI18n({
  locale: language,    // 语言标识
//this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages
});
router.then((r) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router:r ,
    i18n,
    components: { App },
    template: '<App/>'
  })
})

