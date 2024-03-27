export const contentConfig = {
  title: "管理员列表",
  tableItems: [
    {
      type: "normal",
      prop: "userName",
      label: "用户名",
    },
    {
      type: "normal",
      prop: "status",
      label: "状态",
      slotName: "status",
    },
    {
      type: "normal",
      prop: "roleName",
      label: "角色名",
    },
    {
      type: "timer",
      prop: "createTime",
      label: "创建时间",
    },
    {
      type: "timer",
      prop: "updateTime",
      label: "更新时间",
    },
    {
      type: "operation",
      label: "操作",
      prop: "",
    },
  ],
  pageName: "",
};
