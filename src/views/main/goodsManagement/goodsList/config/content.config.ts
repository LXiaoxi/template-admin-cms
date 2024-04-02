const contentConfig = {
  title: "商品列表",
  tableItems: [
    { label: "商品Id", prop: "id" },
    { label: "商品名称", prop: "name" },
    { label: "商品封面", prop: "cover" },
    { label: "商品规格", prop: "specValues", slotName: "spec" },
    { label: "商品分类", prop: "category"},
    { label: "商品销量", prop: "sales" },
    { label: "商品库存", prop: "inventory" },
    { label: "售卖开始时间", prop: "sellTime" },
    { label: "上架城市", prop: "address" },
    { label: "商品状态", prop: "status" ,slotName:'status'},
    { label: "是否售卖", prop: "isSell" ,slotName:'isSell'},
    { type: "timer", label: "创建时间", prop: "createTime" },
    { type: "timer", label: "更新时间", prop: "updateTime" },
    { type: "operation", label: "操作" },
  ],
};
export default contentConfig;
