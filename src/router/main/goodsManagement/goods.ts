const goodsList = () =>
  import("@/views/main/goodsManagement/goodsList/index.vue");
export default {
  path: "/main/goodsManagement/goodsList",
  name: "goods",
  component: goodsList,
  children: [],
};
