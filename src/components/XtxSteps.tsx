import type { FunctionalComponent } from "vue";
import styles from "./Xtxstep.module.less"
interface Props {
    active :number
}
export const XtxSteps:FunctionalComponent<Props> = (props,context) => {
   const content = context.slots.default?.();
   const target:any[] = [];
    //遍历插槽虚拟节点
    content?.forEach(item => {
        if(typeof item.type === "symbol"){//通过遍历生成的就是v-for
            //@ts-ignore
            if(item.children instanceof Array){
                target.push(...item.children)
            }
            
        }else {
            //不是v-for生成的 可以直接使用
            target.push(item)
        }
    })
  return (
    <div className={styles["xtx-steps"]}>
        {target.map((item,index) => (
                <div className={`${styles["xtx-steps-item"]} ${index+1<=props.active?styles.active:""}`}>
            <div className={styles["step"]}>
                <span >{index+1}</span>
            </div>
            <div className={styles["title"]}>{item.props.title}</div>
            <div className={styles["desc"]}>{item.props.desc}</div>
        </div>
            ))}
    </div>
  )
}