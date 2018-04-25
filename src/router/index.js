import Vue from 'vue';
import Router from 'vue-router';
import {muenList } from '../utils/api';
import view from '../components/view';
import layout from '../components/layout';
import menuListPage from '../components/menuList';
import menuTab from '../components/menuTab';
import apps from '../apps';
import config from '../config';
import login from '../apps/login/desktop.vue';

import login1 from '../apps/login/Login.vue'

//import commons from '../utils/treeUtils';
import index from '../apps/index/desktop';
import HelloWorld from '../components/HelloWorld'

Vue.use(Router);

function toTree(list, parent, id, pid) {
  const children = list.filter(item => {
    return item[pid] === parent[id];
  });
  if (children.length !== 0) {
    parent.children = children;
    children.forEach(item => {
      toTree(list, item, id, pid);
    });
  }
}

function getParent(list, id, pid) {
  return list.filter(item => {
    return list.every(obj => {
      return item[pid] !== obj[id];
    });
  });
}

export function list2tree(list, id = 'id', pid = 'parentId') {
  const topList = getParent(list, id, pid);
  topList.forEach(item => toTree(list, item, id, pid));
  return topList;
}

export function findChildren(pid, list) {
  const tree = findTreeNode(pid, list2tree(list));
  if (tree) {
    return tree.children;
  } else {
    return [];
  }
}

let routerList = [];

function findTreeNode(treeId, treeList) {
  for (let i = 0; i < treeList.length; i++) {
    if (treeList[i].id === treeId) {
      return treeList[i];
    } else {
      if(treeList[i].children&&treeList[i].children.length>0){
        const treeNode = findTreeNode(treeId, treeList[i].children);
        if(treeNode){
          return treeNode;
        }
      }
    }
  }
  return null;
}

function buildRouter(parent,router, apps) {
  router.forEach(route => {
    const tag = apps.find(app => app.name === route.name);
    route.component = tag.component;
    if(route.meta){
      route.meta.parent = parent;
      route.meta.children = route.children;
    }else{
      route.meta = {parent:parent,children: route.children};
    }
    if (route.children) {
      buildRouter(route,route.children, apps);
    }
  });
}
export default new Promise((resolve, reject) => {
  muenList().then(result=>{
    const list = [];
    const menuList = result.body.list;
    menuList.forEach(menu => {
      const route = apps.find(route => route.name === menu.code);
      if (route) {
        menu.path = route.path;
        menu.name = route.name;
        menu.meta = route.meta;
        menu.component = route.component;
        list.push(menu);

        apps.filter(item => item.name.indexOf(route.name)===0&&item.name!==route.name).forEach(item=>{
          const menuNew = {};
          for (let key in menu) {
            menuNew[key] = menu[key];
          }
          menuNew.path = item.path;
          menuNew.name = item.name;
          menuNew.meta = item.meta;
          menuNew.hidden = true;
          menuNew.component = item.component;
          list.push(menuNew);
        });
      } else {
        menu.name = menu.code;
        menu.path = menu.code;
        if (menu.level === config.menuLevel) {

          let b = false;
          const children = menuList.filter(
            item => item.functionMenu.parentId === menu.id);

          if (children.length > 0) {
            b = children.every(item => {
              return !menuList.find(
                obj => obj.functionMenu.parentId === item.functionMenu.id);
            });
          }

          if (b) {
            menu.redirect = {name: children[0].functionMenu.name || children[0].functionMenu.code};
            menu.component = menuTab;
          } else {
            menu.component = menuListPage;
          }
        } else {
          menu.component = view;
        }
        list.push(menu);
      }

    });
    const newList = [];
    list.forEach(item => {
      const newItem = {};
      for (let key in item) {
        if (key !== 'component') {
          newItem[key] = item[key];
        }
      }
      newList.push(newItem);
    });

    const routerList = list2tree(newList);
    buildRouter(null, routerList, list);

    routerList.push({
      name: 'index',
      path: '/index',
      hidden:true,
      component: index,
    });

    const router = new Router({
      routes: [
        {
          name: 'main',
          path: '/',
          redirect:'index',
          component: layout,
          children: routerList,
        },
        {
          name: 'login1',
          path: '/login1',
          hidden:true,
          component: login1
        },{
          name: 'login',
          path: '/login',
          hidden:true,
          component: login
        },

      ],
    });
    const whiteList = ['/login'];
    router.beforeEach((to, from, next) => {
     const storage = window.sessionStorage;
      let item = storage.getItem('userData');
      if(item != null){ //若token获取成功，说明登录成功，则继续（此处获取登录信息来校验）
        /*getUser()*/
        next();
      } else { //否则，排除白名单中路径，以免死循环，进入登录页
        if (whiteList.indexOf(to.path) !== -1) { // 在登录白名单，直接进入
          next();
        } else {
          debugger
          if(to.name === "login1"){
            next();
          }else{
            next('/login');
          }
          console.log(to);
          console.log(from);
          console.log(next);

        }
      }
    })
    resolve(router);
  })
});
