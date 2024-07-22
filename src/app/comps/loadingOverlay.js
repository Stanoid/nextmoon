import React from 'react'
import Logo from "../../../public/amblemred.svg"
function LoadingOverlay() {
  return (
    <div className=" bg-[url('../../public/amblemblack.svg')] bg-moon-200 from-moon-200 to-moon-200" style={{backgroundSize:20,position:"fixed",zIndex:10,width:"100svw",height:"100vh",top:0,left:0,alignItems:"center",justifyContent:"center",display:"flex"}}>
    
<div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
    <div className='bg-moon-100 rounded-full p-3' >
    <Logo className="stroke-moon-200  "   width={70} height={70} />
    </div>

{/* <div className='font-semibold text-moon-200 '  style={{marginTop:10}} > ..جار التحميل </div> */}
</div>


    </div>
  )
}

export default LoadingOverlay