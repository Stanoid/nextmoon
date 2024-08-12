import React from 'react'
import { IMG_URL } from '../local'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
function MegaMenu(props) {

    const [rend,SetRend] = useState(0)
    const router = useRouter();
    useEffect(() => {
     
    
    
    }, [rend])
    


  return (
    <div dir='rtl'  className='p-5  overflow-y-scroll lg:overflow-hidden'>
<div className='w-full justify-between  items-start flex flex-row sm:flex-row lg:flex-row '>


<div  className='w-full flex max-h-screen overflow-x-hidden sm:overflow-y-scroll overflow-y-scroll lg:overflow-y-hidden flex-col sm:flex-col lg:flex-row items-start  ' >



{props.data.catagories&&props.data.catagories.map(cat=>(
<div className='min-w-36 mt-3 '>
<a href={`/categories?cid=${cat.id}`}  className='font-bold whitespace-nowrap  cursor-pointer mt-2 text-xl text-right text-moon-300' > 
    <div >{cat.name_ar}</div>
    </a> 
    <div className='flex flex-col text-base space-y-2 mt-1 items-start justify-center'>   
{cat.subcatagories&&cat.subcatagories.map(sub=>(
  <a href={`/subcatagories?sid=${sub.id}`} className='font-medium text-right  cursor-pointer hover:text-moon-200 transition-colors text-moon-300/50' > 
    {sub.name_ar}
    </a> 
      ))} 
<a href={`/categories?cid=${cat.id}`} className='font-medium mt-3 cursor-pointer  hover:text-moon-200 transition-colors text-moon-200' > 
    {" عرض الكل "} 
    </a> 
    </div>  
</div>
    ))}




    <div className='h-20 block sm:block lg:hidden'></div>
    <div className='h-20 block sm:block lg:hidden'></div>
    <div className='h-20 block sm:block lg:hidden'></div>



</div>

<div className='w-fit flex-col justify-center items-center'>

<div className='w-28 h-28  lg:w-40 lg:h-40  relative ' >
       
      
       <Image quality={20} objectFit="cover" className="rounded-md rounded-b-none" fill  src={props.data.img.url&&IMG_URL.concat(props.data.img.formats.medium.url)} />
      
            
         </div>
         <div className='text-center p-2 w-28 lg:w-40  bg-moonsec-100/20 text-gray-900  ' > {props.cat} </div>
     

</div>
   
</div>


    </div>
  )
}

export default MegaMenu