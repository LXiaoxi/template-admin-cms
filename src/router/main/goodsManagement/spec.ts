const goodsSpec = () =>
  import("@/views/main/goodsManagement/goodsSpec/index.vue");
export default {
  path: "/main/goodsManagement/goodsSpec",
  name: "goodsSpec",
  component: goodsSpec,
  children: [],
};
