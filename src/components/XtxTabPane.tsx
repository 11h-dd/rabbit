import type { FunctionalComponent } from "vue";

interface Props {
  // 选项卡选项的唯一标识
  name: string;
  // 选项卡标题
  label: string;
  // 控制内容显示和隐藏的标识
  isActive: boolean;
}

export const XtxTabPane: FunctionalComponent<Props> = (props, context) => {
  return props.isActive ? <div>{context.slots.default?.()}</div> : null;
};
