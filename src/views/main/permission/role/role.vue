<template>
  <div class="role">
    <page-search
      :searchConfig="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></page-search>
    <page-content
      ref="contentRef"
      :tableData="roleData"
      :total="total"
      :contentConfig="contentConfig"
      @handle-current-change="getPageData"
      @handle-size-change="getPageData"
      @handle-edit="handleAdd"
      @handle-new="handleAdd"
      @handle-delete="handleDelete"
    ></page-content>

    <el-dialog v-model="dialogVisible">
      <el-form>
        <el-form-item label="角色名" label-width="120">
          <el-input v-model="modelForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色备注" label-width="120">
          <el-input v-model="modelForm.roleDesc"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" label-width="120">
          <el-tree
            class="tree-border"
            :data="entireMenu"
            check-strictly
            show-checkbox
            ref="treeRef"
            node-key="id"
            empty-text="请稍候"
            :props="{ label: 'menuName', children: 'children' }"
            :default-checked-keys="modelForm.menuIds"
          ></el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="btn">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="handleConfirm" type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from "vue";
import type { ElTree } from "element-plus";

import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";

import searchConfig from "./config/search-config";
import contentConfig from "./config/content-config";

import {
  addRoleRequest,
  delRoleRequest,
  getRoleListRequest,
  roleDetailRequest,
  updateRoleRequest,
} from "@/service/main/permission/role";
import { localCache } from "@/util/cache";
import { getMenuListRequest } from "@/service/main/permission/menu";

const roleData = ref<any>(null);
const total = ref<number>();
const dialogVisible = ref(false);

const queryParams = ref<{
  pageSize: number;
  pageNum: number;
  roleName?: string;
  status?: string;
  createTime?: any;
  updateTime?: any;
  [index: string]: any;
}>({
  pageSize: 10,
  pageNum: 1,
  roleName: "",
  status: "",
  createTime: "",
  updateTime: "",
});
getPageData();
// 获取页面数据
function getPageData(pageNum?: number, pageSize?: number) {
  console.log(pageNum);
  console.log(pageSize);
  if (pageNum || pageSize) {
    queryParams.value.pageNum = pageNum as number;
    queryParams.value.pageSize = pageSize as number;
  }
  getRoleListRequest(queryParams.value).then((res) => {
    if (res.code == 200) {
      roleData.value = res.data;
      total.value = res.total;
    }
  });
}

const contentRef = ref<InstanceType<typeof pageContent>>();
// 查询
function handleQuery(searchForm: any) {
  console.log(searchForm);
  for (let key in searchForm) {
    if (searchForm[key] != "") {
      console.log(searchForm[key]);
      queryParams.value[key] = searchForm[key];
    }
  }
  getPageData();
}
// 重置
const handleReset = () => {
  queryParams.value = {
    pageSize: 10,
    pageNum: 1,
  };
  getPageData();
};
// 删除事件
const handleDelete = (id: number) => {
  delRoleRequest(id).then((res) => {
    if (res.code == 200) {
      ElMessage.success("删除成功");
      getPageData();
    }
  });
};
const entireMenu = ref<any[]>([]);

const treeRef = ref<InstanceType<typeof ElTree>>();
// 树型控件
const modelForm = ref<{
  id?: number;
  roleName?: string;
  roleDesc?: string;
  menuIds?: any[];
  menuId?: string;
}>({
  roleName: "",
  roleDesc: "",
  menuIds: [],
  menuId: "",
});
// 新增编辑事件
const handleAdd = async (row: any) => {
  console.log(row);

  if (row) {
    const res = await roleDetailRequest(row.id);
    modelForm.value = { ...res.data };
    modelForm.value.menuIds = JSON.parse(res.data.menuId).split(",");

    treeRef.value?.setCheckedKeys(modelForm.value.menuIds, true);
    console.log(modelForm.value.menuIds);
  } else {
    modelForm.value = {
      roleName: "",
      roleDesc: "",
      menuIds: [],
    };
  }
  dialogVisible.value = true;
  // 获取菜单
  const res = await getMenuListRequest();
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
    entireMenu.value = parent;
  }
};

// 弹窗的确定事件
const handleConfirm = async () => {
  const newMenuId = treeRef
    .value!.getCheckedNodes(false, true)
    .map((i: any) => i.id);
  modelForm.value.menuId = newMenuId.join(",") as any;
  const newModelForm = { ...modelForm.value };
  delete newModelForm.menuIds;
  let code = null;
  if (modelForm.value.id) {
    const res = await updateRoleRequest(newModelForm);
    code = res.code;
  } else {
    const res = await addRoleRequest(newModelForm);
    code = res.code;
  }
  if (code == 200) {
    ElMessage.success(`${modelForm.value.id ? "编辑" : "新增"}成功`);
    getPageData();
    dialogVisible.value = false;
  }
  console.log(modelForm.value);
};
</script>

<style scoped>
.role {
  border-radius: 5px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: aliceblue;
}
</style>
