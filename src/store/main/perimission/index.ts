import { getMenuListRequest } from "@/service/main/permission/menu";
import { defineStore } from "pinia";
import type { IMainState } from "./type";

function recursion(mid: number, menu: any[]) {
  const newData: any[] = [];
  console.log(menu);

  for (let item of menu) {
    if (item.parentId == mid) {
      let obj = item;
      obj.children = recursion(item.id, menu);
      newData.push(item);
    }
  }
  return newData;
}
const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireMenu: [],
  }),
  actions: {
    async getMenuListAction() {
      const menuResult = await getMenuListRequest();
      const newData = menuResult.data.filter((item: any) => {
        if (item.parentId == null) {
          const obj = item;
          obj.children = recursion(obj.id, menuResult.data);
          return obj;
        }
      });
      console.log(newData, "newData");

      this.entireMenu = newData[0].children;
      console.log(this.entireMenu, "this");
    },
  },
});

export default useMainStore;
