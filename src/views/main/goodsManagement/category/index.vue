<template>
  <div class="category">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      :table-data="tableData"
      :total="total"
      @handle-edit="handleAdd"
      @handle-new="handleAdd"
      @handle-delete="handleDel"
    >
      <template #status="scope">
        <span v-if="scope.row.status == 0">隐藏</span>
        <span v-else-if="scope.row.status == 1">显示</span>
      </template>
    </page-content>
    <el-dialog v-model="dialogVisible" width="500px">
      <el-form :model="modelForm">
        <el-row>
          <el-col :sm="20">
            <el-form-item label="分类名" label-width="120">
              <el-input v-model="modelForm.name"></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="120">
              <el-select v-model="modelForm.status" style="width: 100%">
                <el-option label="显示" value="1"></el-option>
                <el-option label="隐藏" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="btn">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import {
  addCategoryRequest,
  updateCategoryRequest,
  listCategoryRequest,
  delCategoryRequest,
} from "@/service/main/goodsManagement/category";
import type {
  ICategoryForm,
  ICategoryQuery,
  ICategoryVO,
} from "@/service/main/goodsManagement/category/type";
import { ElMessage } from "element-plus";

// -----------------表单-----------
const handleQuery = (row: any) => {
  console.log(row);

  for (let key in row) {
    if (row[key] != "") {
      queryParams.value[key] = row[key];
    }
  }
  getPageData();
};
const handleReset = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
  };
  getPageData();
};

// -----------------表格-----------
const tableData = ref<ICategoryVO[]>([]);
const total = ref();
const queryParams = ref<ICategoryQuery>({
  pageNum: 1,
  pageSize: 10,
});
getPageData();
function getPageData() {
  listCategoryRequest(queryParams.value).then((res) => {
    if (res.code == 200) {
      tableData.value = res.data;
      total.value = res.total;
    }
  });
}
const handleAdd = (row: any) => {
  if (row) {
    modelForm.value = { ...row };
  } else {
    modelForm.value = { ...initModelForm };
  }
  dialogVisible.value = true;
};
const handleDel = (id: number) => {
  delCategoryRequest(id).then((res) => {
    if (res.code == 200) {
      ElMessage.success("删除成功");
      getPageData();
    }
  });
};
// -----------------弹窗-----------
const dialogVisible = ref(false);
const initModelForm = {
  name: "",
  status: "",
};
const modelForm = ref<ICategoryForm>({ ...initModelForm });

// 弹窗确定事件
const handleConfirm = async () => {
  let code = null;
  if (modelForm.value.id) {
    const res = await updateCategoryRequest(modelForm.value);
    code = res.code;
  } else {
    const res = await addCategoryRequest(modelForm.value);
    code = res.code;
  }
  if (code == 200) {
    ElMessage.success(`${modelForm.value.id ? "编辑" : "新增"}成功`);
    getPageData();
    dialogVisible.value = false;
  }
};
</script>

<style scoped></style>
