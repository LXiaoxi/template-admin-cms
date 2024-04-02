const searchConfig = {
  title: "商品分类列表",
  formItems: [
    { type: "input", label: "分类名称", prop: "name" },
    {
      type: "select",
      label: "状态",
      prop: "status",
      options: [
        { value: "0", label: "隐藏" },
        { value: "1", label: "显示" },
      ],
    },
  ],
};
export default searchConfig;
