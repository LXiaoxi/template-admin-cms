import router from "@/router";
import type { RouteRecordRaw } from "vue-router";

const routers: RouteRecordRaw[] = [];

function recursionRouter(router: RouteRecordRaw[], menus: any) {
  if (!menus) return;

  for (let menu of menus) {
    const route = router.find((item) => item.path === menu.path);
    if (route) routers.push(route);
    if (menu) {
      recursionRouter(router, menu.children);
    }
  }

  return routers;
}

export function mapMenusToRoutes(userMenu: any[]) {
  const localRoutes: RouteRecordRaw[] = [];
  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true,
    }
  );
  // 添加全部路由对象
  for (let key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }
  userMenu.unshift({
    path: "/main/index",
    menuName: "首页",
  });
  recursionRouter(localRoutes, userMenu);
  return routers;
}

export function mapPathToMenu(path: string, useMenus: any[]) {
  for (let menu of useMenus) {
    if (menu.children) {
      for (let item of menu.children) {
        if (item.path === path) {
          return item;
        }
      }
    }
  }
}
