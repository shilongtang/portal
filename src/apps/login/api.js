import fetch from '../../utils/fetch';

//登陆模块
export function login() {
  return fetch({
    url: '/long-eureka-client/api/menu/service/list/1/10',
    method: 'GET',
  });
}
