import React, { useReducer } from 'react';

function ReducerDemo(){
    const [ count , dispatch ] =useReducer((state,action)=>{
        switch(action){
            case 'add':
                return state+1
            case 'sub':
                return state-1
            default:
                return state
        }
    },0)
    return (
       <div>
           <h2>现在的分数是{count}</h2>
           <button onClick={()=>dispatch('add')}>Increment</button>
           <button onClick={()=>dispatch('sub')}>Decrement</button>
       </div>
    )

}

export default ReducerDemo

// useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，
//就是状态全局化，并能统一管理。useReducer：通过action的传递，更新复杂逻辑的状态，
//主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。
import React from 'react';
function ShowArea(){

    return (<div style={{color:'blue'}}>字体颜色为blue</div>)

}
export default ShowArea

import React from 'react';

function Buttons(){
    return (
        <div>
            <button>红色</button>
            <button>黄色</button>
        </div>
    )
}

export default Buttons

import React, { useReducer } from 'react';
import ShowArea from './ShowArea';
import Buttons from './Buttons';


function Example6(){
    return (
        <div>
                <ShowArea />
                <Buttons />
        </div>
    )
}

export default Example6


import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example6/Example6'


ReactDOM.render(<Example />, document.getElementById('root'));

import React, { createContext } from 'react';

export const ColorContext = createContext({})

export const Color = props=>{
    return (
        <ColorContext.Provider value={{color:"blue"}}>
            {props.children}
        </ColorContext.Provider>
    )
}

mport React, { useReducer } from 'react';
import ShowArea from './ShowArea';
import Buttons from './Buttons';
import { Color } from './color';   //引入Color组件

function Example6(){
    return (
        <div>
            <Color>
                <ShowArea />
                <Buttons />
            </Color>

        </div>
    )
}

export default Example6

// 改写
import React , { useContext } from 'react';
import { ColorContext } from './color';

function ShowArea(){
    const {color} = useContext(ColorContext)
    return (<div style={{color:color}}>字体颜色为{color}</div>)

}

export default ShowArea

import React, { createContext,useReducer } from 'react';

export const ColorContext = createContext({})

export const UPDATE_COLOR = "UPDATE_COLOR"

const reducer= (state,action)=>{
    switch(action.type){
        case UPDATE_COLOR:
            return action.color
        default:
            return state
    }
}


export const Color = props=>{
    const [color,dispatch]=useReducer(reducer,'blue')
    return (
        <ColorContext.Provider value={{color,dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )
}

import React ,{useContext} from 'react';
import {ColorContext,UPDATE_COLOR} from './color'

function Buttons(){
    const { dispatch } = useContext(ColorContext)
    return (
        <div>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"red"})}}>红色</button>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"yellow"})}}>黄色</button>
        </div>
    )
}

export default Buttons

