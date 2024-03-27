<template>
  <div class="menu">
    <page-content
      :tableData="menuData"
      :total="total"
      :contentConfig="contentConfig"
      @handle-edit="handleAdd"
      @handle-new="handleAdd"
      @handle-delete="handleDelete"
    ></page-content>
    <el-dialog v-model="dialogVisible" :title="title">
      <el-form :model="modelForm">
        <el-form-item label="菜单类型" label-width="120">
          <el-radio-group v-model="modelForm.menuType">
            <el-radio label="M">目录</el-radio>
            <el-radio label="C">菜单</el-radio>
            <el-radio label="F">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="120">
          <el-input v-model="modelForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" label-width="120">
          <el-input v-model="modelForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" label-width="120">
          <el-input v-model="modelForm.orderNum"></el-input>
        </el-form-item>
        <el-form-item
          label="父级id"
          label-width="120"
          v-if="modelForm.menuType == 'C'"
        >
          <el-input v-model="modelForm.parentId"></el-input>
        </el-form-item>
        <el-form-item
          label="路径"
          label-width="120"
          v-if="modelForm.menuType == 'C'"
        >
          <el-input v-model="modelForm.path"></el-input>
        </el-form-item>
        <el-form-item label="显示状态" label-width="120">
          <el-radio-group v-model="modelForm.visible">
            <el-radio label="0">显示</el-radio>
            <el-radio label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单状态" label-width="120">
          <el-radio-group v-model="modelForm.status">
            <el-radio label="0">显示</el-radio>
            <el-radio label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="handleComfirm" type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="menu">
import { ref } from "vue";
import pageContent from "@/components/page-content/page-content.vue";

import contentConfig from "./config/content.config";

import {
  getMenuListRequest,
  addMenuRequest,
  updateMenuRequest,
  delMenuRequest,
} from "@/service/main/permission/menu";
import useLoginStore from "@/store/login/login";
import { localCache } from "@/util/cache";
import { getUserMenuRequest } from "@/service/login/login";
const dialogVisible = ref(false);
const title = ref("");
const menuData = ref<any>([]);
const total = ref<number>(10);
function getPageData() {
  getMenuListRequest().then((res) => {
    if (res.code == 200) {
      const parent: any[] = [];
      const children: any[] = [];
      res.data.forEach((item: any) => {
        if (item.path == null) {
          parent.push(item);
        } else {
          children.push(item);
        }
      });
      for (let item of parent) {
        for (let childrenItem of children) {
          if (item.id == childrenItem.parentId) {
            item.children.push(childrenItem);
          }
        }
      }
      menuData.value = parent;
    }
  });
}

const loginStore = useLoginStore();
const handleComfirm = async () => {
  let code = null;
  if (modelForm.value.id) {
    const res = await updateMenuRequest(modelForm.value);
    code = res.code;
  } else {
    const res = await addMenuRequest(modelForm.value);

    code = res.code;
  }
  if (code == 200) {
    ElMessage.success(`${modelForm.value.id ? "编辑" : "新增"}成功`);
    dialogVisible.value = false;
    getPageData();
    const userInfo = localCache.getCache("userInfo");
    const userMenuRes = await getUserMenuRequest(userInfo.roleId);
    localCache.removeCache("userMenu");
    localCache.setCache("userMenu", userMenuRes.data.menu);
    loginStore.loadLocalCacheAction();
  }
};

getPageData();
interface IModelForm {
  id?: number;
  menuType?: string;
  icon?: string;
  menuName?: string;
  orderNum?: string;
  visible?: string;
  status?: string;
  parentId?: string;
  path?: string;
}
const modelForm = ref<IModelForm>({
  menuType: "M",
  icon: "",
  menuName: "",
  orderNum: "",
  visible: "0",
  status: "0",
  parentId: "",
  path: "",
});
const handleAdd = (row: IModelForm) => {
  dialogVisible.value = true;
  if (row) {
    modelForm.value = { ...row };
  } else {
    modelForm.value = {
      menuType: "M",
      icon: "",
      menuName: "",
      orderNum: "",
      visible: "0",
      status: "0",
    };
  }
};
// 删除事件
const handleDelete = (id: number, item: any) => {
  console.log(item);
  if (item.path == null && item.children.length > 0) {
    ElMessage.warning("存在子级菜单,不可删除");
    return;
  } else {
    delMenuRequest(id).then((res) => {
      if (res.code == 200) {
        ElMessage.success("删除成功");
        getPageData();
      }
    });
  }
};
</script>

<style scoped></style>
