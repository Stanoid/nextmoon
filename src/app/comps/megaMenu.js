import React from 'react'
import { IMG_URL } from '../local'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
function MegaMenu(props) {

    const [rend,SetRend] = useState(0)
    const router = useRouter();
    useEffect(() => {
     
    
    
    }, [rend])
    


  return (
    <div dir='rtl'  className='p-5 h-[500px] overflow-y-scroll lg:overflow-hidden'>
<div className='w-full justify-between  items-start flex flex-row sm:flex-row lg:flex-row '>


<div className='w-full flex flex-col sm:flex-col lg:flex-row items-start justify-around' >



{props.data.catagories&&props.data.catagories.map(cat=>(
  
<div>
<a href={`/categories?cid=${cat.id}`}  className='font-bold  cursor-pointer mt-2 text-xl text-right text-moon-300' > 
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

</div>


    <div className='w-2/3 sm:w-2/3 lg:w-40 mr-0 sm:mr-0 mb-3 lg:mb-0 sm:mb-3 lg:mr-3' >
        <img  className='rounded-md rounded-b-none ' src={props.data.img.url&&IMG_URL.concat(props.data.img.formats.medium.url)}  />
        <div className='text-center p-2 bg-moonsec-100/20 text-gray-900  ' > {props.cat} </div>
    </div>

</div>


    </div>
  )
}

export default MegaMenu