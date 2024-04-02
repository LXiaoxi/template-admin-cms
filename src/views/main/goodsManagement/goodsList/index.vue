<template>
  <div class="goods">
    <el-card>
      <page-search
        :search-config="searchConfig"
        @handle-query="handleQuery"
        @handle-reset="handelReset"
      ></page-search>
      <page-content
        :content-config="contentConfig"
        :table-data="tableData"
        :total="total"
        @handle-edit="handleAdd"
        @handle-new="handleAdd"
        @handle-delete="handleDel"
      >
        <template #spec="scope">
          <template v-for="(item, index) in scope.row.specValues">
            规格:{{ item.specName }}
            <span v-if="index != scope.row.specValues.length - 1">,</span>
            <div>规格值:</div>
            <span v-for="(specValue, i) in item.specValue">
              {{ specValue.value }}
              <span v-if="i != item.specValue.length - 1">,</span>
            </span>
          </template>
        </template>
        <template #status="scope">
          <span v-if="scope.row.status == 0">下架</span>
          <span v-else-if="scope.row.status == 1">上架</span>
        </template>
        <template #isSell="scope">
          <span v-if="scope.row.isSell == 0">否</span>
          <span v-else-if="scope.row.isSell == 1">是</span>
        </template>
      </page-content>
    </el-card>
    <el-dialog v-model="dialogVisible">
      <el-form :model="modelForm">
        <el-row>
          <el-col :sm="12">
            <el-form-item label="商品名称" label-width="120">
              <el-input v-model="modelForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品封面图" label-width="120">
              <el-input v-model="modelForm.cover"></el-input>
            </el-form-item>
            <el-form-item label="库存" label-width="120">
              <el-input v-model="modelForm.inventory"></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="120">
              <el-select v-model="modelForm.status">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="是否售卖" label-width="120">
              <el-select v-model="modelForm.isSell">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="售卖时间" label-width="120">
              <el-time-select
                v-model="modelForm.sellTime"
                start="00:00"
                step="00:15"
                end="23:45"
                style="width: 100%"
              ></el-time-select>
            </el-form-item>
            <el-form-item label="商品分类" label-width="120">
              <el-select v-model="modelForm.categoryId" style="width: 100%">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上架城市" label-width="120">
              <el-cascader
                ref="cityRef"
                v-model="modelForm.addressId"
                :options="cityData"
                :props="{
                  value: 'adcode',
                  label: 'name',
                  children: 'districts',
                }"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <div v-for="(item, index) in specArrList" :key="item.id">
              <el-form-item label="规格" label-width="120">
                <div class="spec-item">
                  <el-select
                    v-model="item.id"
                    @change="handleChangeSpec($event, index)"
                  >
                    <el-option
                      v-for="specItem in specArr"
                      :value="specItem.id"
                      :key="specItem.id"
                      :label="specItem.specName"
                    >
                    </el-option>
                  </el-select>
                  <div class="btn">
                    <el-button @click="handleDelSpec(index)">删除</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="规格值" label-width="120">
                <el-tag
                  closable
                  :disable-transitions="false"
                  v-for="i in specArr[specArrList[index]?.specIndex]?.specValue"
                >
                  {{ i.value }}
                </el-tag>
              </el-form-item>
            </div>
            <div class="spec-btn">
              <el-button @click="handleAddSpec">添加规格</el-button>
            </div>
            <el-form-item label="商品属性" label-width="120">
              <el-table :data="attributeList">
                <el-table-column label="套餐" prop="value"></el-table-column>
                <el-table-column label="图片" prop="cover"></el-table-column>
                <el-table-column label="成本价" prop="costPrice">
                  <template #default="scope">
                    <el-input v-model="scope.row.costPrice"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="售价" prop="price">
                  <template #default="scope">
                    <el-input v-model="scope.row.price"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="库存" prop="inventory">
                  <template #default="scope">
                    <el-input v-model="scope.row.inventory"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
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

<script setup lang="ts">
import { ref } from "vue";

import pageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config";

import pageContent from "@/components/page-content/page-content.vue";
import contentConfig from "./config/content.config";
import { cityData } from "@/util/area-full";

import type {
  IGoodsForm,
  IGoodsQuery,
  IGoodsVO,
} from "@/service/main/goodsManagement/goodsList/type";
import { specListRequest } from "@/service/main/goodsManagement/spec";
import {
  addGoodsRequest,
  updateGoodsRequest,
  goodsListRequest,
  delGoodsRequest,
} from "@/service/main/goodsManagement/goodsList";
import { listCategoryRequest } from "@/service/main/goodsManagement/category";
// ---------------------表单------------
// 查询
const handleQuery = (row: any) => {
  for (let key in row) {
    if (row[key] != undefined) {
      queryParams.value[key] = row[key];
    }
  }
  getPageData();
};
// 重置
const handelReset = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
  };
  getPageData();
};
// ---------------------表格------------
const queryParams = ref<IGoodsQuery>({
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref<IGoodsVO[]>([]);
const total = ref();
getPageData();
// 获取表格数据
function getPageData() {
  goodsListRequest(queryParams.value).then((res) => {
    if (res.code == 200) {
      tableData.value = res.data.map((item) => {
        item.specification = JSON.parse(item.specification);
        item.specValues = JSON.parse(item.specValues);
        return item;
      });
      total.value = res.total;
    }
  });
}
// 获取分类数据
getCategoryData();
const categoryList = ref<any[]>([]);
function getCategoryData() {
  listCategoryRequest({ status: "1" }).then((res) => {
    if (res.code == 200) {
      categoryList.value = res.data.map((item) => {
        let obj = {
          label: item.name,
          value: item.id,
        };
        return obj;
      });
    }
  });
}
// ---------------------弹窗------------
// 获取规格数据
const specParams = ref<{
  pageSize: number;
  pageNum: number;
}>({
  pageNum: 1,
  pageSize: 10,
});
type SpecType = {
  id: string; // 规格id
  specName: string; // 规格名称
  specValue: any; // 规格值
  specIndex?: any;
};
// 存放规格值
const specArr = ref<SpecType[]>([]);

const getSpecData = () => {
  specListRequest(specParams.value).then((res) => {
    if (res.code == 200) {
      specArr.value = res.data.map((item) => {
        item.specValue = JSON.parse(item.specValue);
        return item;
      });
    }
  });
};
getSpecData();
// 弹窗是否显示
const dialogVisible = ref(false);
// 弹窗表单
const init = {
  name: "",
  cover: "",
  specification: "",
  address: "",
  addressId: "",
  isSell: "",
  sellTime: "",
  status: "",
  category: "",
  categoryId: "",
  inventory: undefined,
  specValues: "",
};
const modelForm = ref<IGoodsForm>({ ...init });
const specArrList = ref<
  {
    id: string;
    specName: string;
    specValue: any;
    [key: string]: any;
    specIndex?: any;
  }[]
>([
  {
    id: "",
    specIndex: "",
    specName: "",
    specValue: "",
  },
]);

// 规格删除事件
const handleDelSpec = (index: number) => {
  specArrList.value.splice(index, 1);
  attributeList.value = [];
  recursion([...specArrList.value], 0);
};
// 规格添加事件
const handleAddSpec = () => {
  let isFlat = true;
  specArrList.value.forEach((item) => {
    if (!item.id) {
      isFlat = false;
      return;
    }
  });
  if (isFlat) {
    specArrList.value.push({
      id: "",
      specName: "",
      specValue: "",
    });
  } else {
    ElMessage.warning("请选择规格后再重新添加!");
  }
};
const handleChangeSpec = (e: any, index: number) => {
  const specIndex = specArr.value.findIndex((item) => item.id == e);
  specArrList.value[index].specValue = [...specArr.value[specIndex].specValue];
  specArrList.value[index].specName = specArr.value[specIndex].specName;
  specArrList.value[index].specIndex = specIndex;
  recursion([...specArrList.value], 0);
};
// 商品属性list
const attributeList = ref<any[]>([]);

const recursion = (arr: any, index: number) => {
  // 长度==1: 不做遍历
  if (arr.length == 1) {
    arr[0].specValue.forEach((item: any) => {
      attributeList.value.push({ value: item.value });
    });
  } else if (arr.length == 2) {
    // 长度 == 2: 处理套餐值
    attributeList.value = [];
    arr[index].specValue.forEach((item: any) => {
      arr[index + 1].specValue.reduce((prev: any, cur: any) => {
        prev = item.value + "  -  " + cur.value;
        attributeList.value.push({
          value: prev,
          coder: "",
          costPrice: "",
          price: "",
          inventory: "",
        });
        return prev;
      }, "");
    });
  } else if (arr.length >= 3) {
    // 长度 == 3: 将索引为0改成处理好的数据,截取前面两个数据再做遍历
    arr[0] = { specValue: attributeList.value };
    arr[1] = arr[arr.length - 1];
    arr = arr.slice(0, 2);
    recursion(arr.slice(0, 2), 0);
  }
  return;
};
// 级联选择器ref
const cityRef = ref();

// 打开弹窗
const handleAdd = (row: any) => {
  if (row) {
    modelForm.value = { ...row };
    specArrList.value = row.specValues;
    attributeList.value = row.specification;
  } else {
    modelForm.value = { ...init };
    specArrList.value = [];
    attributeList.value = [];
  }
  dialogVisible.value = true;
};
// 删除事件
const handleDel = (id: number) => {
  delGoodsRequest(id).then((res) => {
    if (res.code == 200) {
      ElMessage.success("删除成功");
      getPageData();
    }
  });
};

// 弹窗确定事件
const handleConfirm = async () => {
  modelForm.value.specification = JSON.stringify(attributeList.value);
  modelForm.value.address = cityRef.value.getCheckedNodes(true)[0]?.text;
  modelForm.value.addressId = cityRef.value.getCheckedNodes(true)[0]?.value;
  modelForm.value.category = categoryList.value.find(
    (item) => item.value == modelForm.value.categoryId
  ).label;
  modelForm.value.specValues = JSON.stringify(specArrList.value);
  let code = null;
  if (modelForm.value.id) {
    const res = await updateGoodsRequest(modelForm.value);
    code = res.code;
  } else {
    // 新增
    const res = await addGoodsRequest(modelForm.value);
    code = res.code;
  }
  if (code == 200) {
    ElMessage.success(`${modelForm.value.id ? "编辑" : "新增"}成功`);
    dialogVisible.value = false;
    getPageData();
  }
};
</script>

<style scoped lang="less">
.goods {
  .spec-item {
    display: flex;
    flex-wrap: nowrap;
    .btn {
      margin-left: 10px;
    }
  }

  .spec-btn {
    margin-left: 140px;
  }
  .goods-attribute {
    margin-left: -22px;
  }
}
</style>
