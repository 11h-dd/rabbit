import Xtxconfirm from "@/components/Xtxconfirm.vue";
import type { callback } from "@/components/Xtxconfirm.vue";

import { render } from "vue";

export default function myConfirm(props: { title?: string; content: string }) {
  return new Promise((resolve, reject) => {
    const vNode = h(Xtxconfirm, {
      ...props,
      close,
      sure: resolve,
      cancel: reject,
    });
    //创建虚拟dom的容器
    const container = document.createElement("div");
    document.body.appendChild(container);
    render(vNode, container);
    function close() {
      render(null, container);
      document.body.removeChild(container);
    }
  });
}
