export const searchConfig = {
  title: "管理员搜索",
  formItems: [
    {
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名",
      prop: "userName",
      initialValue: "",
    },
    {
      type: "select",
      label: "状态",
      placeholder: "请输入状态",
      prop: "status",
      options: [
        { label: "启用", value: "0" },
        { label: "禁用", value: "1" },
      ],
    },
  ],
};

interface searchFormItem {
  type: string;
  label: string;
  placeholder: string;
  name: string;
}
