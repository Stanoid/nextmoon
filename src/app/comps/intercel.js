import React from 'react'
import { Theme } from '../local';
import { BsMegaphone,BsShop,BsPlus,BsCheck } from 'react-icons/bs';
import { useEffect,useState} from 'react';

function interCell(props) {
    
  

  return (
<div onClick={props.ex?()=>{props.removecat(props.id)}:()=>{props.addcat(props.id,props.name)}} style={{display:"inline-block",cursor:"pointer",userSelect:"none",opacity:props.selected.length==5&&!props.ex?0.3:1}}>
<div style={{display:"flex",alignItems:"center",backgroundColor:props.ex?Theme.primary:"white",color:props.ex?"white":Theme.primary,justifyContent:"center",padding:"0px 4px",border:"2px solid"+Theme.primary,borderRadius:50,margin:"2px 2px"}}>
    {
   props.ex?<BsCheck/>:<BsPlus/>
    }
      {props.name}</div>
</div>
    )
}

export default interCell