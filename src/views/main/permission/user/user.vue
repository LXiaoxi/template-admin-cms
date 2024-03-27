<template>
  <div class="user">
    <page-search
      :searchConfig="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></page-search>
    <page-content
      :table-data="tableData"
      :total="total"
      :contentConfig="contentConfig"
      @handleCurrentChange="getPageData"
      @handleSizeChange="getPageData"
      @handleEdit="handleAdd"
      @handleNew="handleAdd"
      @handleDelete="handleDelete"
    >
      <template #status="scope">
        <el-button type="primary" size="small" v-if="scope.row.status == 0"
          >启用</el-button
        >
        <el-button type="danger" size="small" v-else>禁用</el-button>
      </template>
    </page-content>
    <el-dialog v-model="dialogVisible">
      <el-form :model="modelForm">
        <el-form-item label="管理员名称" label-width="120">
          <el-input v-model="modelForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120">
          <el-input type="password" v-model="modelForm.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120">
          <el-radio-group v-model="modelForm.status">
            <el-radio label="0">显示</el-radio>
            <el-radio label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" label-width="120">
          <el-select v-model="modelForm.roleId">
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :value="item.id"
              :label="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="btn">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="handelConfirm" type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import { searchConfig } from "./config/search.config";
import { contentConfig } from "./config/conten.config";

import {
  deleteUserRequest,
  getUserListRequest,
  updateUserRequest,
  addUserRequest,
} from "@/service/main/permission/user";
import { ElMessage } from "element-plus";
import { getRoleListRequest } from "@/service/main/permission/role";
const tableData = ref();
const total = ref();
const queryParams = ref<{
  pageSize: number;
  pageNum: number;
  userName?: string;
  status?: string;
  [index: string]: any;
}>({
  pageNum: 1,
  pageSize: 10,
});
getPageData();
const roleData = ref<any[]>([]);
function getPageData(pageNum?: number, pageSize?: number) {
  if (pageNum || pageSize) {
    queryParams.value.pageNum = pageNum as number;
    queryParams.value.pageSize = pageSize as number;
  }
  getUserListRequest(queryParams.value).then((res) => {
    tableData.value = res.data;
    total.value = res.total;
  });
  getRoleListRequest().then((res) => {
    if (res.code == 200) {
      roleData.value = res.data;
    }
  });
}

// 查询
const handleQuery = (searchForm: any) => {
  console.log(searchForm);
  for (let key in searchForm) {
    if (searchForm[key] != "") {
      queryParams.value[key] = searchForm[key];
    }
  }
  getPageData();
};
// 重置
const handleReset = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
  };
  getPageData();
};
const dialogVisible = ref(false);
const modelForm = ref<{
  id?: number;
  userName?: string;
  status?: string;
  password?: string;
  roleId?: number | string;
}>({
  userName: "",
  status: "0",
  password: "",
  roleId: "",
});
// 新增/编辑
const handleAdd = (row: any) => {
  console.log(row);
  if (row) {
    modelForm.value = { ...row };
  } else {
    modelForm.value = {
      status: "0",
    };
  }
  dialogVisible.value = true;
};

// 弹窗确定事件
const handelConfirm = async () => {
  let code = null;
  if (modelForm.value.id) {
    const res = await updateUserRequest(modelForm.value);
    code = res.code;
  } else {
    const res = await addUserRequest(modelForm.value);
    code = res.code;
  }
  if (code == 200) {
    ElMessage.success(`${modelForm.value.id ? "编辑" : "新增"}成功`);
    getPageData();
    dialogVisible.value = false;
  }
};

// 删除事件
const handleDelete = (id: number) => {
  deleteUserRequest(id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: res.msg,
      });
      getPageData();
    }
  });
};
</script>

<style scoped>
.user {
  border-radius: 5px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: aliceblue;
}
</style>
