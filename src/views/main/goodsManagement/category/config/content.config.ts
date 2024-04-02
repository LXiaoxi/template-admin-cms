const contentConfig = {
  title: "商品分类列表",
  tableItems: [
    { label: "分类id", prop: "id" },
    { label: "分类名称", prop: "name" },
    { label: "状态", prop: "status", slotName: "status" },
    { type: "timer", label: "创建时间", prop: "createTime" },
    { type: "timer", label: "更新时间", prop: "updateTime" },
    { type: "operation", label: "操作" },
  ],
};
export default contentConfig;
