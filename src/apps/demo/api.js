import fetch from '../../utils/fetch';

//删除
export function muenList() {
  return fetch({
    url: '/long-eureka-client/api/menu/service/delete/1/10',
    method: 'GET',
  });
}
