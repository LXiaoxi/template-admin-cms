import xxRequest from "@/service";
export function getRoleListRequest(params?: any) {
  return xxRequest.get({
    url: `/role/list`,
    params,
  });
}
// 添加角色
export function addRoleRequest(data: any) {
  return xxRequest.post({
    url: `/role/add`,
    data,
  });
}
// 修改角色
export function updateRoleRequest(data: any) {
  return xxRequest.put({
    url: `/role/update`,
    data,
  });
}
// 删除角色
export function delRoleRequest(id: number) {
  return xxRequest.delete({
    url: `/role/del/${id}`,
  });
}
// 获取角色详情
export function roleDetailRequest(id: number) {
  return xxRequest.get({
    url: `/role/${id}`,
  });
}
