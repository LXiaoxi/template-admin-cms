export interface IGoodsForm {
  id?: number | string;
  name: string;
  cover: string;
  specification: string;
  specValues: string;
  address: string;
  addressId: string;
  status: string;
  inventory: number | undefined;
  isSell: string;
  sellTime: string;
  category: string;
  categoryId: string;
}
export interface IGoodsQuery {
  name?: string;
  status?: string;
  pageSize: number;
  pageNum: number;
  [key: string]: any;
}
export interface IGoodsVO {
  id: number | string;
  name: string;
  cover: string;
  specification: string;
  specValues: string;
  address: string;
  addressId: string;
  status: string;
  sales: number | undefined;
  inventory: number | undefined;
  isSell: string;
  sellTime: string;
  category: string;
  categoryId: string;
}
