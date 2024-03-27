const modelConfig = {
  newTitle: "新建菜单",
  editTitle: "编辑菜单",
  formItems: [
    { type: "input", prop: "menuName", label: "菜单名" },
    { type: "input", prop: "path", label: "菜单路径" },
    { type: "input", prop: "icon", label: "图标" },
    { type: "input", prop: "orderNum", label: "显示顺序" },
    { type: "input", prop: "parentId", label: "父级菜单" },
    { type: "input", prop: "remark", label: "菜单备注" },
  ],
};
export default modelConfig;
