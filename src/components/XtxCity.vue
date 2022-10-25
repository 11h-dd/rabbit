<script setup lang="ts">
import type { Status } from "@/types/Status";
import axios from "axios";
import type { City } from "@/types/City";
const emit = defineEmits<{
  (e: "Onchange", addressCode: AddressCode): void;
  (e: "update:fullLocation"): void;
}>();
const props = defineProps<{
  fullLocation: string;
}>();
interface AddressCode {
  provinceCode: string;
  cityCode: string;
  countyCode: string;
}
const visible = ref(false);
//缓存成熟数据
let cachedCities: City[] = [];
const status = ref<Status>("idle");
const cities = ref<City[]>([]);
let addressCode: Partial<AddressCode> = {};
interface AddressName {
  provinceName: string;
  cityName: string;
  countyName: string;
}
//地区名字
const addressname: Partial<AddressName> = {};
const selectCity = useVModel(props, "fullLocation");
//显示
async function show() {
  visible.value = true;
  if (cachedCities.length === 0) {
    status.value = "loading";
    let response = await axios.get(
      "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
    );
    status.value = "success";
    //缓存数据
    cachedCities = response.data;
  }
  cities.value = cachedCities;
}
function updateCities(code: string, level: number, name: string) {
  cities.value = cities.value.find((city) => city.code === code)?.areaList!;
  //switch 在不同的区域返回不同的数据
  switch (level) {
    case 0: //省
      addressCode.provinceCode = code;
      addressname.provinceName = name;
      break;
    case 1: //市
      addressCode.cityCode = code;
      addressname.cityName = name;
      break;
    case 2: //区县
      addressCode.countyCode = code;
      addressname.countyName = name;
      //自定义时间编码传递到父组件
      emit("Onchange", <Required<AddressCode>>addressCode); //变量所有属性都是必选的
      hide();
      selectCity.value =
        addressname.provinceName! +
        addressname.cityName! +
        addressname.countyName!;
      break;
  }
}
//隐藏
function hide() {
  visible.value = false;
}
//切换
function toggle() {
  visible.value ? hide() : show();
}
const target = ref(null);
onClickOutside(target, hide);
//vite 默认将图片大于10kb的变成base64格式的了
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span class="placeholder" v-if="!selectCity">请选择收货地址</span>
      <span class="value" v-else>{{ selectCity }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <template v-if="status === 'success'">
        <span
          @click="updateCities(i.code, i.level, i.name)"
          class="ellipsis"
          v-for="i in cities"
          :key="i.code"
          >{{ i.name }}</span
        >
      </template>
      <template v-if="status === 'loading'">
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
