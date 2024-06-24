import React from 'react'

import { Theme } from '../local'
function LoadingBtn(props) {
  return (

 


<button onClick={props.act} style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:Theme.primary}}
 className="mt-4 w-full  text-white py-1 px-5 rounded-sm text-md tracking-wide">

<div style={{display:props.lod?"flex":"none",justifyContent:"center",alignItems:"center"}} className="lds-facebookbtn"><div></div><div></div><div></div></div>
<span style={{display:props.lod?"none":"block"}} >{props.text}</span>
</button>


  )
}

export default LoadingBtn