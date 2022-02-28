// 类组件，利用PROP实现传值（单向，由父亲到孩子，可以提升）

import React, { useState , createContext } from 'react';
//===关键代码
const CountContext = createContext()

function Example4(){
    const [ count , setCount ] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
            {/*======关键代码 */}
            <CountContext.Provider value={count}>
            <Counter /> 
            </CountContext.Provider>

        </div>
    )
}
export default Example4;

//另外一个组件接受
import React, { useState , createContext , useContext } from 'react';
function Counter(){
    const count = useContext(CountContext)  //一句话就可以得到count
    return (<h2>{count}</h2>)
}
