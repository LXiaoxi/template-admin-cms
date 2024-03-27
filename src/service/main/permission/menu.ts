import xxRequest from "@/service";
export function getMenuListRequest() {
  return xxRequest.get({
    url: `/menu/list`,
  });
}

export function addMenuRequest(data: any) {
  return xxRequest.post({
    url: `/menu/add`,
    data,
  });
}

export function updateMenuRequest(data: any) {
  return xxRequest.put({
    url: `/menu/update`,
    data,
  });
}

export function delMenuRequest(id: number) {
  return xxRequest.delete({
    url: `/menu/del/${id}`,
  });
}
