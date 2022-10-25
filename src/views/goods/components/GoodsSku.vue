<script setup lang="ts">
// Spec: 在页面中展示的规格状态的类型
import type { Sku, Spec } from "@/types/Goods";
import bwPowerSet from "@/vendors/power-set";
import type { Data } from "@/stores/goodsStore";
// specs: 在页面中展示的规格状态
const props = defineProps<{ specs: Spec[]; skus: Sku[]; skuId?: string }>();
const emit = defineEmits<{
  (e: "complete", data: Data): void;
  (e: "incomplete"): void;
}>();

//规格选项新增状态
interface UIStatus {
  selected: boolean;
  disable: boolean;
}
interface PathMap {
  [key: string]: string | null;
}
const UIstatus = reactive(createUIStatus(props.specs));
const pathMap = CreatePathMap();
//数据就是PathMap判断是否组合数据
function CreatePathMap(): PathMap {
  const pathMap: PathMap = {};
  const sku = props.skus
    .filter((item) => item.inventory > 0)
    .forEach((sku) => {
      const valueName = sku.specs.map((spec) => spec.valueName);
      const Names = bwPowerSet(valueName).filter((item) => item.length > 0);
      const max = valueName.length;
      Names.forEach((set) => {
        const key = set.join("_");
        //判断规格是否有key属性
        if (!(key in pathMap)) {
          if (set.length == max) {
            pathMap[key] = sku.id;
          } else {
            pathMap[key] = null;
          }
        }
      });
    });
  return pathMap;
} //这个就是判断显示还是不显示的函数
function setDisableUIStatus() {
  const specs = props.specs;
  specs.forEach((spec, index) => {
    const selected = getUserSelected();
    spec.values.forEach((value, i) => {
      //检测规则
      if (UIstatus[index][i].selected) return;
      // 将当前规格名称放入用户选择的规格数组名称中, 待匹配
      selected[index] = value.name;
      // 检测当前规格是否可以选择
      const key = selected.filter((name) => name).join("_");
      // 如不能选择, 设置当前规格的 disabled 为 true
      UIstatus[index][i].disable = !(key in pathMap);
    });
  });
}

function createUIStatus(specs: Spec) {
  //specs 真是的数据遍历数据
  const UIStatus: UIStatus[][] = [];
  specs.forEach((value: Spec) => {
    const group: UIStatus[] = [];
    value.values.forEach((items) => {
      group.push({ selected: false, disable: false });
    });
    UIStatus.push(group);
  });
  return UIStatus;
}

function selectedUIStatus(index: number, i: number) {
  const current = UIstatus[index][i];
  const group = UIstatus[index];
  if (current.disable) return;
  if (current.selected) {
    current.selected = false;
  } else {
    group.forEach((item) => (item.selected = false));
    // 将当前用户点击的规格设置为选中
    current.selected = true;
  }
  setDisableUIStatus();
}
function getUserSelected() {
  const Names: (string | undefined)[] = [];
  props.specs.forEach((spec, index) => {
    const selectedIndex = UIstatus[index].findIndex((item) => item.selected);
    if (selectedIndex !== -1) {
      Names[index] = spec.values[selectedIndex].name;
    } else {
      Names[index] = undefined;
    }
  });
  return Names;
}
function setSpecDefaultSelected() {
  if (typeof props.skuId !== "undefined") {
    // 查找默认选中的规格对象, 从中获取规格名称
    const selected = props.skus.find((sku) => sku.id === props.skuId);
    // 如果没有找到默认选中的规格对象, 阻止程序继续运行
    if (typeof selected === "undefined") return;
    // 获取默认选中的规格名称数组
    const names = selected.specs.map((spec) => spec.valueName);

    // 遍历页面中展示的规格(组)
    props.specs.forEach((spec, index) =>
      // 遍历页面中展示的每一个具体的规格
      spec.values.forEach((value, i) => {
        // 查看当前遍历的规格的名称是否被包含在默认选中的规格名称数组中
        if (names.includes(value.name)) {
          // 设置当前规格的选中状态
          UIstatus[index][i].selected = true;
        }
      })
    );
  }
}
function sendGoodsInfoToParent() {
  const selected = getUserSelected().filter((item) => item);
  if (selected.length === props.specs.length) {
    const skuId = pathMap[selected.join("_")]!;
    const sku = props.skus.find((sku) => sku.id === skuId);
    if (typeof sku !== "undefined") {
      emit("complete", {
        price: sku.price,
        oldPrice: sku.oldPrice,
        inventory: sku.inventory,
        skuId,
      });
    }
  } else {
    emit("incomplete");
  }
}
setDisableUIStatus();
setSpecDefaultSelected();
</script>

<template>
  <div class="goods-sku">
    <dl v-for="(spec, index) in specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="(item, i) in spec.values">
          <img
            :class="{
              selected: UIstatus[index][i].selected,
              disabled: UIstatus[index][i].disable,
            }"
            v-if="item.picture"
            :src="item.picture"
            :alt="item.name"
            @click="
              selectedUIStatus(index, i);
              sendGoodsInfoToParent();
            "
          />
          <span
            @click="
              selectedUIStatus(index, i);
              sendGoodsInfoToParent();
            "
            :class="{
              selected: UIstatus[index][i].selected,
              disabled: UIstatus[index][i].disable,
            }"
            v-else
            >{{ item.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
