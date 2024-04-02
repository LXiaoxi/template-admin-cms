export interface ICategoryForm {
  id?: number;
  name: string;
  status: string;
}
export interface ICategoryQuery {
  name?: string;
  status?: string;
  pageSize?: number;
  pageNum?: number;

  [key: string]: any;
}

export interface ICategoryVO {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  status: string;
}
