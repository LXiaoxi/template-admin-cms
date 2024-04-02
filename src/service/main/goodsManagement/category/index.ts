import xxRequest from "@/service";
import type { AxiosPromise } from "axios";
import type { ICategoryForm, ICategoryQuery, ICategoryVO } from "./type";

export function addCategoryRequest(data: ICategoryForm) {
  return xxRequest.post({
    url: `/category/add`,
    data,
  });
}

export function updateCategoryRequest(data: ICategoryForm) {
  return xxRequest.put({
    url: `/category/update`,
    data,
  });
}

export function delCategoryRequest(id: number) {
  return xxRequest.delete({
    url: `/category/del/${id}`,
  });
}

export function listCategoryRequest(
  query: ICategoryQuery
): AxiosPromise<ICategoryVO[]> {
  return xxRequest.get({
    url: `/category/list`,
    params: query,
  });
}

export function getCategoryRequest(id: number): AxiosPromise<ICategoryForm> {
  return xxRequest.get({
    url: `/category/${id}`,
  });
}
