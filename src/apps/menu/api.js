import fetch from '../../utils/fetch';

//查询菜单list
export function muenList() {
  return fetch({
    url: '/long-eureka-client/api/menu/service/list/1/10',
    method: 'GET',
  });
}
//保存菜单--有id则修改
export function save(data) {
  return fetch({
    url:'/long-eureka-client/api/menu/service/save',
    method:'PUT',
    data
  })
}
export function deleteMenu(id) {
  return fetch({
    url:'/long-eureka-client/api/menu/service/delete/'+id,
    method:'DELETE'
  })

}
