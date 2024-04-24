import React from 'react'
import { Theme } from '../local'
import { BsPlus } from 'react-icons/bs'
function InputEl(props) {
  return (
    <>

    {props.select
    ? <div class="w-full">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
      {props.label} 
      </label>
      <div class="relative">
        <select onChange={(e)=>{props.outputfunc(e.target.value)}} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        {props.data&&props.data.map((datum,index)=>(

<option  value={datum.id} key={index}>
    {props.iscats?datum.attributes.catagory.data.attributes.name_en +" / ":"" }  { datum.attributes.name_en}
</option>
))}
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      {/* <div style={{
        padding:4,
        textDecoration:"underline",
        color:Theme.primary,
        fontSize:15,
      }}>
      <BsPlus style={{display:"inline-block",fontSize:20}} />  Add a new {props.label} 
      </div> */}
    </div>
    :<div class="w-full">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
     {props.label} 
    </label>
    <input  onChange={(e)=>{props.outputfunc(e.target.value)}} class="appearance-none block w-full bg-gray-200 text-gray-700 border
     border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white
      focus:border-gray-500" id="grid-last-name" type={props.num?"number":"text"} placeholder={props.label}/>
  </div>}
    
    
    </>
    


  )
}

export default InputEl