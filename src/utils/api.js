import fetch from './fetch';

//删除
export function muenList() {
  return fetch({
    url: '/long-eureka-client/api/menu/service/list/1/10',
    method: 'GET',
  });
}
