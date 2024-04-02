const category = () =>
  import("@/views/main/goodsManagement/category/index.vue");
export default {
  path: "/main/goodsManagement/category",
  name: "category",
  component: category,
  children: [],
};
