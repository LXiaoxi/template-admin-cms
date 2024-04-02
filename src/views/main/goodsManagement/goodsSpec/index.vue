<template>
  <div class="goods-spec">
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
      <template #specValue="scope">
        <template v-for="(item, index) in scope.row.specValue" :key="item.id">
          <span v-if="index != scope.row.specValue.length - 1">
            {{ item.value }}-
          </span>
          <span v-else>{{ item.value }}</span>
        </template>
      </template>
    </page-content>

    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form :model="modelForm">
        <el-row>
          <el-col :sm="20">
            <el-form-item label="规格名称" label-width="120">
              <el-input v-model="modelForm.specName"></el-input>
            </el-form-item>
            <el-form-item label="规格值" label-width="120">
              <el-tag
                class="tag"
                v-for="(item, index) in specValues"
                :key="item.id"
                closable
                @close="handleSpecClose(index)"
              >
                {{ item.value }}
              </el-tag>
              <el-input
                style="margin: 5px 0; width: 100px"
                v-if="inputVisible"
                v-model="inputValue"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button @click="handleAddSpec" style="margin-left: 10px"
                >添加</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="btn">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="handleConfirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import pageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config";

import pageContent from "@/components/page-content/page-content.vue";
import contentConfig from "./config/content.config";
import {
  specListRequest,
  addSpecRequest,
  updateSpecRequest,
  delSpecReuqest,
} from "@/service/main/goodsManagement/spec/index";
import type {
  ISpecVo,
  ISpecQuery,
  ISpecForm,
} from "@/service/main/goodsManagement/spec/type";
// ----------------表单---------------
const handleQuery = (row: any) => {
  for (let key in row) {
    if (row[key] != "") {
      queryParams.value[key] = row[key];
    }
  }
  queryParams.value.specName = row.specName;
  getPageData();
};
const handleReset = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
  };
  getPageData();
};
// ----------------表格---------------
// 表格数据
const tableData = ref<ISpecVo[]>([]);
const queryParams = ref<ISpecQuery>({
  pageNum: 1,
  pageSize: 10,
});
const total = ref<number>();
const getPageData = () => {
  specListRequest(queryParams.value).then((res) => {
    if (res.code == 200) {
      tableData.value = res.data.map((item) => {
        item.specValue = JSON.parse(item.specValue);
        return item;
      });
      total.value = res.total;
    }
  });
};
getPageData();
// 新增编辑事件
const handleAdd = (row: any) => {
  if (row) {
    modelForm.value = {
      id: row.id,
      specName: row.specName,
      specValue: row.specValue,
    };
    specValues.value = [...row.specValue];
  } else {
    modelForm.value = {
      specName: "",
      specValue: "",
    };
  }
  dialogVisible.value = true;
};
// 删除事件
const handleDel = (id: number) => {
  delSpecReuqest(id).then((res) => {
    if (res.code == 200) {
      ElMessage.success("删除成功");
      getPageData();
    }
  });
};
// ----------------弹窗----------------

// 弹窗title
const title = ref<string>("新增规格");
// 弹窗
const dialogVisible = ref(false);

// 弹窗表单
const modelForm = ref<ISpecForm>({
  specName: "",
  specValue: "",
});

// 添加规格
const inputVisible = ref(false);
const inputValue = ref<string>("");
const specValues = ref<{ id: number; value: string }[]>([]);
const handleAddSpec = () => {
  inputVisible.value = true;
};
const handleInputConfirm = () => {
  const len = specValues.value.length;
  if (!inputValue.value) return;
  specValues.value.push({ id: len, value: inputValue.value });
  inputValue.value = "";
  inputVisible.value = false;
};

// 删除规格
const handleSpecClose = (index: number) => {
  specValues.value.splice(index, 1);
};
// 弹窗确定事件
const handleConfirm = async () => {
  let code = null;
  modelForm.value.specValue = JSON.stringify(specValues.value);
  if (modelForm.value.id) {
    const res = await updateSpecRequest(modelForm.value);
    code = res.code;
  } else {
    // 新增
    const res = await addSpecRequest(modelForm.value);
    code = res.code;
  }
  if (code == 200) {
    ElMessage.success(`${modelForm.value.id ? "编辑" : "新增"}成功`);
    getPageData();
    dialogVisible.value = false;
  }
};
</script>

<style scoped lang="less">
.goods-spec {
  .tag {
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
