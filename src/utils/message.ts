import XtxMessageVue, { type Props } from "@/components/XtxMessage.vue";
import { h, render } from "vue";
export default function message(props: Props) {
  const vNode = h(XtxMessageVue, props);
  //创建容器
  const container = document.createElement("div");

  document.body.appendChild(container);
  render(vNode, container);
  setTimeout(() => {
    if (vNode.component && vNode.component?.exposed) {
      vNode.component.exposed.toggle.value = false;
      setTimeout(() => {
        document.body.removeChild(container);
      }, 800);
    }
  }, 3000);
}
