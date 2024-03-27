const modelConfig = {
  pageName: "role",
  newTitle: "新建角色",
  editTitle: "编辑角色",
  formItems: [
    {
      type: "input",
      prop: "roleName",
      label: "角色名",
      placeholder: "请输入角色名",
    },
    {
      type: "input",
      prop: "roleDesc",
      label: "角色备注",
      placeholder: "请输入角色备注信息",
    },
    {
      type: "custom",
      prop: "menuList",
      slotName: "menuList",
    },
  ],
};
export default modelConfig;
