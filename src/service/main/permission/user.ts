import xxRequest from "../../index";

export function getUserListRequest(query: any) {
  return xxRequest.get({
    url: `/user/list`,
    params: query,
  });
}
// 新建用户
export function addUserRequest(data: any) {
  return xxRequest.post({
    url: `/user/add`,
    data,
  });
}

// 编辑用户信息
export function updateUserRequest(data: any) {
  return xxRequest.put({
    url: `/user/update`,
    data,
  });
}

export function deleteUserRequest(id: number) {
  return xxRequest.delete({
    url: `/user/del/${id}`,
  });
}
