export interface ISpecForm {
  id?: number;
  specName: string;
  specValue: string;
}

export interface ISpecQuery {
  pageSize: number;
  pageNum: number;
  specName?: string;
  [key: string]: any;
}
export interface ISpecVo {
  id: string;
  specName: string;
  specValue: string;
}
