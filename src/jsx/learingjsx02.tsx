import type { FunctionalComponent } from "vue";

export const learnjsx:FunctionalComponent = () => {
return <helloWorld username={"你好"} age={12}></helloWorld>
}
interface helloWorldProps {
    username:string;
    age:number
}
export const helloWorld:FunctionalComponent<helloWorldProps> =(props) => (
    <div>{props.username} {props.age}</div>
)
export const chacao = (props,context) => {
    return <>
    {context.slots.header?.()}
    {context.slots.body?.()}
    </>
}

export const Emits:FunctionalComponent<{},{
    bbc:(name:string)=>void
}> = (props,context) => {
    return <button onClick={() => {
        context.emit("bbc",'李四')
    }}>button</button>
}