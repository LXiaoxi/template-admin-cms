const contentConfig = {
  title: "菜单列表",
  pageName: "menu",
  tableItems: [
    { label: "菜单Id", prop: "id" },

    { label: "菜单名", prop: "menuName" },
    { label: "菜单路径", prop: "path" },
    { label: "菜单图标", prop: "icon" },
    { label: "菜单备注", prop: "remark" },
    { label: "显示顺序", prop: "orderNum" },
    { label: "父级Id", prop: "parentId" },
    { type: "operation", label: "操作" },
  ],
  childrenTree: {
    rowKey: "id",
    treeProps: {
      children: "children",
    },
  },
};
export default contentConfig;
