const contentConfig = {
  title: "规格列表",
  tableItems: [
    { label: "规格名", prop: "specName" },
    { label: "规格值", prop: "specValue", slotName: "specValue" },
    { type: "timer", label: "创建时间", prop: "createTime" },
    { type: "timer", label: "更新时间", prop: "updateTime" },
    { type: "operation", label: "操作" },
  ],
};
export default contentConfig;
