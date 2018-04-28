import login from './login.vue';
import constant from './constant'
const menuList = [
  {
    path: constant.menu,
    name: constant.menu,
    component: login
  },
  {
    name: constant.menu_1,
    path: constant.menu_1,
    component: login,
  }
];

export default menuList;
