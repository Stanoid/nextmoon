'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import InputEl from '../comps/inputel';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import LoadingBtn from '../comps/loadingbtn';

import { AuthCon } from '../contexts/AuthCon';



function AddProduct() {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const router = useRouter(); 
    const [page,setPage] = useState(1) 
    const [logged,setLogged] = useState(0)
    const [userData,setUserdata] = useState(null)
    const [colors,setColors] = useState([])
    const [sizes,setSizes] = useState([])
    const [cats,setCats] = useState([])

    const [namear,setNamear] = useState("")
    const [nameen,setNameen] = useState("")
    const [descar,setDescar] = useState("")
    const [descen,setDescen] = useState("")
    const [subc,setSubc] = useState(null)
    const [imgs,setImgs] = useState([])
    const [color,setcolor] = useState(null)
    const [size,setSize] = useState(null)
    const [price,setPrice] = useState(null)
    const [stock,setStock] = useState(null)

    const [lod,setlod] = useState(false)

    const [formData, setFormData] = useState({
      imgs: '',
     
    });

    const [files,setFiles] = useState()
 


    useEffect(() => {
    // loginval();
     getColors();
    }, [])
    
    async function loginvalHandler(){
      console.log("aaaa",loginval())
      loginval.then(function(result) {
       console.log("aaaa",result)
    });
    }
 
    

    // const handleInputChange = (event) => {
    //   const { name, value } = event.target;
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [name]: value,
    //   }));
    // };



    const handleSubmit = (event) => {
      event.preventDefault();
  

    
    };


    const  uploadMedia = ()=>{
  
     var tmepar = [];
      for (let i = 0; i < files.length; i++) {
        const postData = new FormData();
        postData.append('files', files[i])
        //console.log("postdata",postData);    
      axios.post("http://localhost:1337/api/upload", postData)
      .then((response)=>{
        const imageId = response.data[0].id
       tmepar[i]= response.data[0].url
       console.log(response.data[0].url);
       setImgs(tmepar);
      
      }).then(()=>{
        
        if(i==files.length-1){
          submitProduct();
        }
       
       
      })
        
        
      }
//console.log("trmpa",tmepar);
   
    // 
    //   setImgs(tmepar);

    }

    

    const getColors=()=>{

      
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}colors`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("color data ", data.data);
           setColors(data.data);
          }).then(()=>{
           
            getSizes()
          })
    
    
    
    
        }
    
    
        
        const getSizes=()=>{
         
    
             
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}sizes`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("sizes data ",data.data )
           setSizes(data.data);
          }).then(()=>{
         getCats();
          
          })
    
    
        }


        const getCats=()=>{
         
    
             
            const requestOptions = {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + ls.get("atkn")
              },
            
          };
        
            fetch(`${API_URL}subcatagories?populate=*`, requestOptions)
              .then((response) => response.json())
              .then((data) => {
                console.log("sub catagories data ",data.data )
               setCats(data.data);
              }).then(()=>{
           
              
              })
        
        
            }
    


    
   const loginval = ()=>{


    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + ls.get("atkn")
      },
    
  };

    fetch(`${API_URL}users/me`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

      console.log("aaaaaaaaaaaaaaaaaaaaaaa",data)

        
  if(data.id){

  if(data.type==1){
       
 
  }else{



    }
  
   }else{
  setLogged(0);
  router.push("/login")

   }
    
     
      });

  }



 const submitProduct = (imgsob)=>{


  console.log(imgs);
  


//console.log("aaaaa",imgsob);

    if( namear==""||nameen==""||descar==""||descen==""||subc==null||color==null||size==null||stock==null||price==null||imgs==[] ){
    alert("empty feilds");
    return;
    }else{

        setlod(true);

         //const jsonarray = JSON.stringify(imgsob);
        

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + ls.get("atkn")
            },
            body: JSON.stringify(
                {
                   "nameen":nameen,
                   "namear":namear,
                   "descen":descen,
                   "descar":descar,
                   "subc":subc,
                   "color":color,
                   "size":size,
                   "stock":stock,
                   "price":price,
                   "imgs": JSON.stringify(imgs)
                  }
              )
          
        };
      
          fetch(`${API_URL}products?func=AddProduct`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log("added product data",data )
              setlod(false);
            }).then(()=>{
         
            
            })
      



    }
   


 }


 

  return (
  



    
<div 
    style={{
      
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      justifyContent:"center",
      padding:5
      
 }}>

   



   <div style={{
    width:"70%",
display:"grid",
gap:10,
gridTemplateAreas:`
' namear  namear  nameen nameen  ' 
'descriptionAr descriptionAr descriptionAr descriptionAr'
'descriptionEn descriptionEn descriptionEn descriptionEn'
'cat images images images'
'color size price stock'
`


   }} >


    <div style={{gridArea:"namear"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"Product name (Arabic)"}/>
    </div>

    <div style={{gridArea:"nameen"}}>
    <InputEl outputfunc={(val)=>{setNameen(val)}} label={"Product name (English)"}/>
    </div>

    <div style={{gridArea:"descriptionAr"}}>
    <InputEl  outputfunc={(val)=>{setDescar(val)}} label={"Product description (Arabic)"}/>
    </div>

    <div style={{gridArea:"descriptionEn"}}>
    <InputEl outputfunc={(val)=>{setDescen(val)}}  label={"Product description (English)"}/>
    </div>

    <div style={{gridArea:"cat"}}>
    <InputEl outputfunc={(val)=>{setSubc(val)}} select={true} iscats={true} data={cats}   label={"Sub-category"}/>
    </div>

    <div style={{gridArea:"images"}}>
   < div class="w-full">
   <form onSubmit={handleSubmit} id="imgForm">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
     Images
    </label>
   
    <input  onChange={(e)=>{setFiles(e.target.files)}}  class="appearance-none block w-full bg-gray-200 text-gray-700 border
     border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white
      focus:border-gray-500" id="grid-last-name"  name='imgs' type="file" multiple placeholder={"Images"}/>

<button type="submit">Submit</button>

    </form>
   
  </div>
    </div>


    <div style={{gridArea:"price"}}>
    <InputEl  outputfunc={(val)=>{setPrice(val)}} num={true}  label={"Price"}/>
    </div>

    <div style={{gridArea:"stock"}}>
    <InputEl   outputfunc={(val)=>{setStock(val)}} num={true} label={"Stock"}/>
    </div>


    <div style={{gridArea:"color"}}>
    <InputEl outputfunc={(val)=>{setcolor(val)}} iden={"color"} data={colors} select={true}   label={"Color"}/>
    </div>

    <div style={{gridArea:"size"}}>
    <InputEl outputfunc={(val)=>{setSize(val)}} iden={"size"} data={sizes}  select={true}   label={"Size"}/>
    </div>


  

   </div>

  

   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>


<LoadingBtn act={()=>{uploadMedia()}} lod={lod} text={"Add product"} />
</div>

      
    </div>
    




  )
}

export default AddProduct






















































