import type { FunctionalComponent } from "vue";
import styles from "./XtxTabs.module.less";

interface Props {
  name: string;
}

export const XtxTabs: FunctionalComponent<
  Props,
  {
    "update:name": (name: string) => void;
    onTabClicked: (index: number) => void;
  }
> = (props, context) => {
  // 获取当前组件的插槽内容
  const content = context.slots.default?.();
  // 存储需要渲染的虚拟节点
  // const target: VNode[] = [];
  const target: any[] = [];
  // 让选项卡组件同时支持遍历写法和固定写法
  content?.forEach((item) => {
    // 判断当前的虚拟节点是否是通过 v-for 生成的
    if (typeof item.type === "symbol") {
      // v-for
      if (item.children instanceof Array) {
        target.push(...item.children);
      }
    } else {
      // 固定写法
      target.push(item);
    }
  });

  // 当选项卡标题被点击时执行
  const onTabClicked = (index: number, name: string) => {
    context.emit("update:name", name);
    context.emit("onTabClicked", index);
  };
  return (
    <div className={styles["xtx-tabs"]}>
      <nav>
        {target.map((item, index) => {
          if (item.props !== null) {
            item.props.isActive = item.props.name === props.name;
          }
          return (
            <a
              onClick={() => onTabClicked(index, item.props?.name)}
              className={item.props?.isActive ? styles.active : ""}
              href="javascript:"
            >
              {item.props?.label}
            </a>
          );
        })}
      </nav>
      {content}
    </div>
  );
};
