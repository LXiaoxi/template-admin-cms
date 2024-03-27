<template>
  <div class="user_model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modelConfig.newTitle : modelConfig.editTitle"
    >
      <el-form
        :label-width="modelConfig.labelWidth ?? '80px'"
        :model="modelForm"
      >
        <el-row :gutter="20">
          <template v-for="item in modelConfig.formItems" :key="item.prop">
            <el-col :span="modelConfig.spanWidth ?? 24">
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type == 'input'">
                  <el-input
                    v-model="modelForm[item.prop]"
                    :placeholder="item.placeholder"
                  ></el-input>
                </template>
                <template v-if="item.type == 'date-picker'">
                  <el-date-picker
                    v-model="modelForm[item.prop]"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  />
                </template>
                <template v-if="item.type == 'image'">
                  <el-image
                    :src="modelForm[item.prop]"
                    style="width: 100px; height: 100px"
                  ></el-image>
                </template>
                <template v-if="item.type == 'custom'">
                  <slot :name="item.slotName"></slot>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="isShowBtn">
          <el-button @click="handleConfirmClick" type="primary">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface IProps {
  modelConfig: {
    labelWidth?: string;
    spanWidth?: number;
    otherInfo?: string;
    isId?: boolean;
    pageName?: string;
    newTitle: string;
    editTitle: string;
    formItems: any[];
  };
  otherInfo?: any;
  isShowBtn?: boolean;
}
const emit = defineEmits(["modelInfo"]);
// const props = defineProps<IProps>();
// props设置默认值
const props = withDefaults(defineProps<IProps>(), {
  isShowBtn: true,
});

let dialogVisible = ref(false);
const isNewRef = ref(true);

const initralForm: any = {};
for (const item of props.modelConfig.formItems) {
  initralForm[item.prop] = item.initralValue ?? "";
}
const modelForm = reactive<any>(initralForm);

const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true;
  isNewRef.value = isNew;
  if ((!isNew && itemData) || (isNew && itemData)) {
    for (const key in modelForm) {
      modelForm[key] = itemData[key];
      modelForm["id"] = itemData["id"];
    }
  } else {
    for (const key in modelForm) {
      delete modelForm["id"];
      modelForm[key] = "";
    }
  }
};

// 确定按钮
const handleConfirmClick = async () => {
  emit("modelInfo", modelForm);
  dialogVisible.value = false;
};

defineExpose({
  setModalVisible,
});
</script>

<style lang="less" scoped></style>
