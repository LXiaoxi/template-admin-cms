const searchConfig = {
  title: "角色搜索",
  formItems: [
    { type: "input", label: "角色名", prop: "roleName" },
    {
      type: "select",
      label: "角色状态",
      prop: "status",
      options: [
        { label: "启用", value: "0" },
        { label: "禁用", value: "1" },
      ],
    },
    { type: "date-picker", label: "创建时间", prop: "createTime" },
    { type: "date-picker", label: "修改时间", prop: "updateTime" },
  ],
};
export default searchConfig;
