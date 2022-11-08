const box = (//<>占位符如果只想渲染里面的两个span就这样
 
    <> 
    {/*
    注释 不糊出现在渲染结构中
    */} 
      <span>1</span>
    <span>2</span>
    </>

)
export function lrean(){
    
    return <div className="ii" htmlFor="box"
    >Hello World</div>
}
const someCount = "一段内容"
const someActive = "active"
const fruites = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "pear" },
  ];
function test(){
    alert('Hello World')
}
export function chazhi(){
    return (
       <>
        <div className={someActive}>{someCount}</div>
        <button onClick={test}>点击</button>
       </>
    )
}
export function RenderUl(){
    return <ul>
        {
            fruites.map(item => {
                return (<li key={item.id}>{item.name}</li>)
            })
        }
    </ul>
}
const count =ref(0)
export const ChangeCount = () => (
    <button onClick={() => {
        count.value ++
    }}>{count.value}</button>
)
const isactive = ref(false)
export const IsActive =() => (
    <>
    <div className={isactive.value ?"active":"inActive"}></div>
    {isactive.value ?<strong>isactive 真</strong>:<p>isactive 位false</p>}
    <button onClick={() => {
        isactive.value = !isactive.value
    }}>button</button>
    </>

)
const text = ref('')
export const yVModels =() => (
   <>
    <input type="text" v-model={text.value} />
    {text.value}
   </>
)