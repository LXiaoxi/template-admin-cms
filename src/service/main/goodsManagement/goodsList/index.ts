import xxRequest from "@/service";
import type { AxiosPromise } from "axios";
import type { IGoodsForm, IGoodsQuery, IGoodsVO } from "./type";
// 添加商品
export function addGoodsRequest(data: IGoodsForm) {
  return xxRequest.post({
    url: `/goods/add`,
    data,
  });
}

// 修改商品
export function updateGoodsRequest(data: IGoodsForm) {
  return xxRequest.put({
    url: `/goods/update`,
    data,
  });
}
// 删除商品
export function delGoodsRequest(id: number) {
  return xxRequest.delete({
    url: `/goods/del/${id}`,
  });
}

// 获取商品列表
export function goodsListRequest(query: IGoodsQuery): AxiosPromise<IGoodsVO[]> {
  return xxRequest.get({
    url: `/goods/list`,
    params: query,
  });
}
// 获取商品详情
export function getGoodsRequest(id: number): AxiosPromise<IGoodsVO> {
  return xxRequest.get({
    url: `/goods/${id}`,
  });
}
