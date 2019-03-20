import httpRequest from '@/utils/httpRequest'
/**
 * 查询用户列表
 * @param {Object} params 传进来的参数
 */
export function getUserListsTabledata (params) {
  return httpRequest({
    url: '/users',
    params
  })
}
/**
 * 删除数据
 * @param {string} id 数据id
 */
export function removeUserItem (id) {
  return httpRequest({
    url: `/userlists/${id}`,
    method: 'DELETE'
  })
}

export function addUser (userInfo) {
  return httpRequest({
    url: '/addUser',
    method: 'POST',
    data: {
      ...userInfo
    }
  })
}

export function updateUser (info) {
  return httpRequest({
    url: `/update/${info.id}`,
    method: 'PUT',
    data: {
      name: info.name,
      age: info.age
    }
  })
}
