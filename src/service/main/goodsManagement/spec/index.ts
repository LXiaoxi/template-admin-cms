import type { AxiosPromise } from "axios";
import xxRequest from "@/service";
import type { ISpecForm, ISpecQuery, ISpecVo } from "./type";

// 添加规格
export function addSpecRequest(data: ISpecForm) {
  return xxRequest.post({
    url: `/spec/add`,
    data,
  });
}

// 修改规格
export function updateSpecRequest(data: ISpecForm) {
  return xxRequest.put({
    url: `/spec/update`,
    data,
  });
}
// 删除规格
export function delSpecReuqest(id: number) {
  return xxRequest.delete({
    url: `/spec/del/${id}`,
  });
}

// 规格列表
export function specListRequest(query: ISpecQuery): AxiosPromise<ISpecVo[]> {
  return xxRequest.get({
    url: `/spec/list`,
    params: query,
  });
}

// 规格详情
export function getSpecRequest(id: number): AxiosPromise<ISpecVo> {
  return xxRequest.get({
    url: `/spec/${id}`,
  });
}
