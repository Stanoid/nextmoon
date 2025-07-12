    import React from "react";
    import {
      Table,
      TableHeader,
      
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
      Input,
      Button,
      DropdownTrigger,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      User,
      Pagination,

    } from "@nextui-org/react";
    import Image from "next/image";
    import { IMG_URL,CURRENCY } from "../../local";
    import {PlusIcon} from "./PlusIcon";
    import {VerticalDotsIcon} from "./VerticalDotsIcon";
    import { useEffect } from "react";
    import {SearchIcon} from "./SearchIcon";
    import { useRouter } from "next/navigation";
    import {ChevronDownIcon} from "./ChevronDownIcon";
    import { FaEye,FaPencil,FaTrash,FaCreditCard, FaEyeSlash, FaCheckDouble, FaCopy, FaPenToSquare, FaToggleOn, FaBan } from "react-icons/fa6";
    import {columns, users, statusOptions} from "./data";
    import {capitalize} from "./utils";
    import { color } from "framer-motion";
    import { FaEdit } from "react-icons/fa";


    const statusColorMap = {
      active: "success",
      paused: "danger",
      vacation: "warning",
    };

    const INITIAL_VISIBLE_COLUMNS = ["name","createdAt","cat","name_en","section","icon","img","color","scate","colore","cate","colorCode","size", "city",
      "status","pstatus", "email","refid","refida","date",'phone',"feat",
      "delivery_type","total","payment_type","payment_status","total","name_ar","description_ar",
      "code","price","images","qty","colorname","sizeo","imgsingle"];

    export default function App(props) {
      const [filterValue, setFilterValue] = React.useState("");
      const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
      const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
      const [statusFilter, setStatusFilter] = React.useState("all");
      const router = useRouter();
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [columns, setColumns] = React.useState(null);
      const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
      });
      const [page, setPage] = React.useState(1);

      useEffect(() => {
      
    switch (props.coldata) {
      case "dorders":
        
        break;




      default:
        break;
    }



      }, [columns])
      


      const hasSearchFilter = Boolean(filterValue);

      const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return props.columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
      }, [visibleColumns]);

      const filteredItems = React.useMemo(() => {
        let filteredUsers = [...props.data];

        if (hasSearchFilter) {

          try {
            filteredUsers = filteredUsers.filter((user) =>
              //  console.log(user)
              props.search=="code"?
                user.code.toLowerCase().includes(filterValue.toLowerCase()): props.search=="phone"?user.phone.toLowerCase().includes(filterValue.toLowerCase()) :user.name_ar.toLowerCase().includes(filterValue.toLowerCase()),
              );
          } catch (error) {
            console.log("thrown",error);
          }

        
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
          filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.status),
          );
        }

        return filteredUsers;
      }, [props.data, filterValue, statusFilter]);

      const pages = Math.ceil(filteredItems.length / rowsPerPage);

      const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
      }, [page, filteredItems, rowsPerPage]);

      const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];
          const cmp = first < second ? -1 : first > second ? 1 : 0;

          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }, [sortDescriptor, items]);

      const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        // console.log("Column Key:", columnKey, "Value:", cellValue); 
        // console.log("wtf istis ", cellValue)

        switch (columnKey) {    
          case "name":
            return (
              <User
                avatarProps={{radius: "full",size:"sm", color:"primary ", src: user.avatar}}
                description={user.email}
                name={cellValue}
              >
                {user.email}
              </User>
            );
          case "role":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
                <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
              </div>
            );

            case "color":
              return (
                <div className=" flex w-full items-center justify-center">
                        <div style={{backgroundColor:cellValue}} className="w-6 h-6 transition-transform hover:scale-150 cursor-zoom-in rounded-full shadow-lg "></div>
                </div>
              );
              break;

            case "total":
              return (
                <div className=" whitespace-nowrap">
                      {cellValue} <span className="italic text-xs text-gray-600" > {CURRENCY} </span> 
                </div>
              );
              break;


          case "status":
        let stob = {};
          switch (cellValue) {
            case "initiated":
          stob.lable = "غير مؤكد ";
          stob.color = "text-gray-700 bg-gray-200 min-w ";
          stob.dot = "bg-gray-700";
          stob.istog=false; 
            break;

            case "processed":
              stob.lable = "غير موصل ";
              stob.color = "text-amber-700 bg-amber-200 min-w ";
            stob.dot = "bg-amber-700";
            stob.istog=false; 
              break;

            case "delivered":
              stob.lable = "تم التوصيل";
              stob.color = "text-green-600 bg-green-300 min-w ";
              stob.dot = "bg-green-600";
              stob.istog=false; 
          
              
              break;


              case true:
                stob.lable = "متاح";
                stob.color = "text-green-600 bg-green-300 min-w ";
                stob.dot = "bg-green-600";
                
            
                
                break;


                case false:
                  stob.lable = " غير متاح ";
                  stob.color = "text-amber-700 bg-amber-200 min-w ";
                stob.dot = "bg-amber-700";
                  
                  break;


            
          
            default:
              stob.lable = cellValue;
              stob.color = "text-gray-700 bg-gray-200 min-w ";
            stob.dot = "bg-gray-700";
              break;
          }


          return (<div className={stob.color} style={{
            display:"flex",
            whiteSpace:"nowrap",

            alignItems:"center",
            justifyContent:"center",
      
            padding:"4px 10px",
            borderRadius:10
          
          }} > 
          <div   className={stob.dot} style={{width:10,height:10,borderRadius:100,marginLeft:7,marginRight:7,fontSize:10}}></div>
          {stob.lable} 
          </div>);
          break;

          case "payment_status":
            let stobp = {};
            switch (cellValue) {
              case "unpaid":
              stobp.lable = "غير مدفوع";
              stobp.color = "text-amber-700 bg-amber-200 ";
            stobp.dot = "bg-amber-700";
              
              break;
      
              case "paid":
                stobp.lable = "تم الدفع";
                stobp.color = "text-green-600 bg-green-300";
                stobp.dot = "bg-green-600";
              
                
                  break;
      
      
              
            
              default:
                break;
            }
      
      
            return (<div className={stobp.color} style={{
              display:"flex",
              whiteSpace:"nowrap",
              alignItems:"center",
              justifyContent:"center",
        
              padding:"4px 10px",
              borderRadius:10
            
            }} > 
            <div   className={stobp.dot} style={{width:10,height:10,borderRadius:100,marginLeft:7,marginRight:7,fontSize:10}}></div>
            {stobp.lable} 
            </div>);
            break;


            case "delivery_type":
              let delob = {};
              switch (cellValue) {
                case "delivery":
                  delob.lable = "توصيل لعنوان";
                  delob.color = "text-moonsec-200 bg-moonsec-200/10 ";
                  delob.dot = "bg-moonsec-200";
                
                break;
        
                case "pickup":
                  delob.lable = "إستلام من مركز";
                  delob.color = "text-moonsec-100 bg-moonsec-100/10 ";
                  delob.dot = "bg-moonsec-100";
                
                  
                    break;
                default:
                  break;
              }
        
        
              return (<div className={delob.color} style={{
                display:"flex",
                whiteSpace:"nowrap",
                alignItems:"center",
                justifyContent:"center",
          
                padding:"4px 10px",
                borderRadius:10
              
              }} > 
              <div   className={delob.dot} style={{width:10,height:10,borderRadius:100,marginLeft:7,marginRight:7,fontSize:10}}></div>
              {delob.lable} 
              </div>);
              break;
      



              case "payment_type":
              let payob = {};
              switch (cellValue) {
                case "online":
                  payob.lable = "إلكتروني";
                  payob.color = "text-moon-200 bg-moon-200/10  ";
                  payob.dot = "bg-moon-200";
                
                break;
        
                case "delivery":
                  payob.lable = "عند الإستلام";
                  payob.color = "text-moonsec-100 bg-moonsec-100/10 ";
                  payob.dot = "bg-moonsec-100";
                
                  
                    break;
                default:
                  break;
              }
        
        
              return (<div className={payob.color} style={{
                display:"flex",
                whiteSpace:"nowrap",
                alignItems:"center",
                justifyContent:"center",
          
                padding:"4px 10px",
                borderRadius:10
              
              }} > 
              <div   className={payob.dot} style={{width:10,height:10,borderRadius:100,marginLeft:7,marginRight:7,fontSize:10}}></div>
              {payob.lable} 
              </div>);
              break;





          case "date":
            var date = new Date(cellValue * 1000);
            var hours = date.getHours();
          
            var y = date.toLocaleDateString("ar-EG",{  
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',});
            var minutes =   date.getMinutes();
            return(
            <div className="whitespace-nowrap" > {y} - <span className="" > {hours}:{minutes} </span> </div> 
            );



          break;

          
          
          case "images":
            if (!Array.isArray(cellValue) || cellValue.length === 0 || !cellValue[0]?.url) {
              return (
                <div className="w-16 h-16 flex items-center justify-center text-xs text-gray-400 border rounded-md border-gray-300">
                  No Image
                </div>
              );
            }
            
            const imageUrl = cellValue[0].url;
            const srcd = imageUrl.startsWith("http") ? imageUrl : `${IMG_URL}${imageUrl}`;
            const src = imageUrl?.startsWith("http") ? imageUrl : `${IMG_URL}${imageUrl}`;


            return (
              <div className="w-16 h-16 relative">
                <Image
                  fill
                  className="rounded-md object-cover"
                  quality={40}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={src}
                  alt="product"
                />
              </div>
            );
          
              
              break;

          case "feat":
          
          return(
          

          <div className="py-2 px-4 text-center text-white font-bold rounded-md " style={{backgroundColor:cellValue?"#2eff89":"#ff424c"}} >
            {cellValue?"نعم":"لا"}
          </div>

          );



        break;



          case 'code':
          return(
            <div className="px-6 py-2 text-center text-white bg-moon-200 rounded-full" >{cellValue}</div>
          );
          break;

          case 'price':
            return(
              <div className="text-moon-200 font-bold flex " > <div className="mr-2" >{CURRENCY}</div> <div>{cellValue}</div>  </div>
            );
            break;
      
          case "imgsingle":
          
          return(
          

            <div className=' w-16  h-16' style={{position:"relative"}} >
            <Image  fill objectFit='cover'
            quality={40}
            className="rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={cellValue} 
          
            />
            </div>

          );



        break;


        

          case "varients":
            return(
          <div className="flex-wrap">
            
            {cellValue&&cellValue.map((varient,index)=>(

              <div className="inline-block mx-0.5 m-0.5 text-xs ">
              <div className="inline-block px-3 py-2  rounded-sm bg-moon-200/10 text-moon-200 " >
                {varient.sizes[0].name_ar} ({varient.sizes[0].icon})- {varient.price} {CURRENCY}  
              </div>
              </div>
        
      //   <div
      //   className="flex-col "
      //   style={{
      //     padding: 10,
      //     borderRadius: 10,
      //     cursor: "pointer",
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   }}
      //   key={varient.id}
      // >
      //   <div
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //       justifyContent: "center",
      //     }}
      //   >
      //   </div>
      //   <div
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //       justifyContent: "center",
      //       flexDirection: "column",
        
      //     }}
      //   >
      //     <div
      //     className="flex space-x-0.5 text-xs text-moon-300 font-bold mt-1 italic justify-center"
      //     >
      //        <div> {CURRENCY} </div > <div> {varient.price} </div>  
      //     </div>
      //   </div>
      // </div>
      
        ))}
          </div>
            
            );

          break;


          case "name_ar":
            return(
          <div className="min-w-40" >
            {cellValue.slice(0,40)+"..."}
          </div>
            
            );

          break;

          case "description_ar":
            return(
          <div className="min-w-44" >
            {cellValue.slice(0,40)+"..."}
          </div>
            
            );

          break;

        
          
          case "refida":
            return (
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown
                
                classNames={{
                  // base: "before:bg-default-200", // change arrow background
                  // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary dark:from-default-50 dark:to-black",
                }}

                backdrop="blur">
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu textValue="a" dir="rtl" disabledKeys={["delete"]}>
                    <DropdownItem textValue="a"  onClick={()=>{props.delorder(user)}} startContent={<FaEye style={{marginRight:4}} />} key={"view"} >
                      عرض</DropdownItem>
                  
                      {user.status=="initiated"? <DropdownItem textValue="a" onClick={()=>{
                    props.conorder(user.id)
                    }} startContent={<FaCheckDouble style={{marginRight:4}} />} key={"confirm"} > تأكيد </DropdownItem> :<DropdownItem textValue="a" ></DropdownItem> 
    }


    {user.status=="initiated"? <DropdownItem className="text-red-500" textValue="a" onClick={()=>{
                    props.deleteorder(user.id)
                    }} startContent={<FaTrash style={{marginRight:4}} />} key={"edit"} > إلغاء الطلب </DropdownItem> :<DropdownItem textValue="a" ></DropdownItem> 
    }
                    
                    {user.payment_status=="paid"||user.payment_type=="delivery"? <DropdownItem textValue="a" ></DropdownItem> : <DropdownItem textValue="a" onClick={()=>{
                      router.push(user.url)
                    }} startContent={<FaCreditCard style={{marginRight:4}} />} key={"edit"} > دفع </DropdownItem>
    }
                                  
                    
                    
                    <DropdownItem textValue="a" startContent={<FaTrash style={{marginRight:4}} />} key={"delete"} >إلغاء</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            );
            break;


          case "refid":
            return (
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown
                
                classNames={{
                  // base: "before:bg-default-200", // change arrow background
                  // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary dark:from-default-50 dark:to-black",
                }}

                backdrop="blur">
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu textValue="a" dir="rtl" disabledKeys={["delete"]}>
                    <DropdownItem textValue="a"  onClick={()=>{props.delorder(user)}} startContent={<FaEye style={{marginRight:4}} />} key={"view"} >
                      عرض</DropdownItem>

                    
                    {user.payment_status=="paid"||user.payment_type=="delivery"? <DropdownItem textValue="a" ></DropdownItem> : <DropdownItem textValue="a" onClick={()=>{
                      router.push(user.url)
                    }} startContent={<FaCreditCard style={{marginRight:4}} />} key={"edit"} > دفع </DropdownItem>
    }
                                  
                    
                    
                    <DropdownItem textValue="a" startContent={<FaTrash style={{marginRight:4}} />} key={"delete"} >إلغاء</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            );
            break;

            case "createdAt":
              return (
                <div className="relative flex justify-end items-center gap-2">
                  <Dropdown
                  
                  classNames={{
                    // base: "before:bg-default-200", // change arrow background
                    // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary dark:from-default-50 dark:to-black",
                  }}
      
                  backdrop="blur">
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                      </Button>
                    </DropdownTrigger>

                  {props.whouse?  <DropdownMenu textValue="a "  dir="rtl" disabledKeys={["delete"]}>
                  
          
                  

                  <DropdownItem textValue="a"   onClick={()=>{ props.duplicateProduct(user)}} startContent={<FaPenToSquare style={{marginRight:4}} />} key={"view"} >
    <div className="py-1 font-bold text-gray-600 "> تعديل الكمية</div>  </DropdownItem>


                    </DropdownMenu>
    :  <DropdownMenu textValue="a "  dir="rtl" disabledKeys={["delete"]}>
    <DropdownItem textValue="a"   onClick={()=>{ props.delorder(user)}} startContent={<FaEdit style={{marginRight:4}} />} key={"view"} >
    <div className="py-1 font-bold text-gray-600 "> تعديل المنتج </div>  </DropdownItem>

    <DropdownItem textValue="a"   onClick={()=>{ props.duplicateProduct(user)}} startContent={<FaCopy style={{marginRight:4}} />} key={"view"} >
    <div className="py-1 font-bold text-gray-600 ">نسخ المنتج</div>  </DropdownItem>



    <DropdownItem textValue="a" onClick={()=>{props.statusChange(!user.status,user.id)}} startContent={<FaEyeSlash style={{marginRight:4}} />} key={"hid"} >
    <div className="py-1 font-bold text-gray-600 ">
    إخفاء/إظهار
    </div>
    </DropdownItem>

    <DropdownItem textValue="a"  onClick={()=>{props.deleteProduct(user.id)}} startContent={<FaTrash className="text-red-600" style={{marginRight:4}} />} key={"del"} >
    <div className="py-2 font-medium text-red-500">   حذف المنتج </div> </DropdownItem>

    </DropdownMenu>
    }


                  </Dropdown>
                </div>
              );
              break;


              case "size":
                return (
                  <div className="relative flex justify-end items-center gap-2">
                    <Dropdown
                    
                    classNames={{
                      // base: "before:bg-default-200", // change arrow background
                      // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary dark:from-default-50 dark:to-black",
                    }}
        
                    backdrop="blur">
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon className="text-default-300" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu textValue="a "  dir="rtl" disabledKeys={["delete"]}>
                        <DropdownItem textValue="a"   onClick={()=>{ props.editSize(user)}} startContent={<FaEdit style={{marginRight:4}} />} key={"view"} >
                        <div className="py-1 font-bold text-gray-600 "> تعديل المقاس </div>  </DropdownItem>
      
                        <DropdownItem textValue="a"  onClick={()=>{props.deleteProduct(user.id)}} startContent={<FaTrash className="text-red-600" style={{marginRight:4}} />} key={"del"} >
                      <div className="py-2 font-medium text-red-500">   حذف المقاس </div> </DropdownItem>

      
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                );
                break;

                case "colore":
                  return (
                    <div className="relative flex justify-end items-center gap-2">
                      <Dropdown
                      
                      classNames={{
                        // base: "before:bg-default-200", // change arrow background
                        // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary dark:from-default-50 dark:to-black",
                      }}
          
                      backdrop="blur">
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu textValue="a "  dir="rtl" disabledKeys={["delete"]}>
                          <DropdownItem textValue="a"   onClick={()=>{ props.editColor(user)}} startContent={<FaEdit style={{marginRight:4}} />} key={"view"} >
                          <div className="py-1 font-bold text-gray-600 "> تعديل اللون </div>  </DropdownItem>
        
                          <DropdownItem textValue="a"  onClick={()=>{props.deleteProduct(user.id)}} startContent={<FaTrash className="text-red-600" style={{marginRight:4}} />} key={"del"} >
                          <div className="py-2 font-medium text-red-500">   حذف اللون </div> </DropdownItem>
      
        
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  );
                  break;

                  case "cate":
                    return (
                      <div className="relative flex justify-end items-center gap-2">
                        <Dropdown
                        
                        classNames={{
                          // base: "before:bg-default-200", // change arrow background
                          // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary dark:from-default-50 dark:to-black",
                        }}
            
                        backdrop="blur">
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <VerticalDotsIcon className="text-default-300" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu textValue="a "  dir="rtl" disabledKeys={["delete"]}>
                            <DropdownItem textValue="a"   onClick={()=>{ props.editCat(user)}} startContent={<FaEdit style={{marginRight:4}} />} key={"view"} >
                            <div className="py-1 font-bold text-gray-600 "> تعديل الفئة </div>  </DropdownItem>
                          
                            <DropdownItem textValue="a"  onClick={()=>{props.deleteProduct(user.id)}} startContent={<FaTrash className="text-red-600" style={{marginRight:4}} />} key={"del"} >
                          <div className="py-2 font-medium text-red-500">   حذف الفئة </div> </DropdownItem>
                          
        
          
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    );
                    break;

                    case "scate":
                      return (
                        <div className="relative flex justify-end items-center gap-2">
                          <Dropdown
                          
                          classNames={{
                            // base: "before:bg-default-200", // change arrow background
                            // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary dark:from-default-50 dark:to-black",
                          }}
              
                          backdrop="blur">
                            <DropdownTrigger>
                              <Button isIconOnly size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-300" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu textValue="a "  dir="rtl" disabledKeys={["delete"]}>
                              <DropdownItem textValue="a"   onClick={()=>{ props.editScat(user)}} startContent={<FaEdit style={{marginRight:4}} />} key={"view"} >
                              <div className="py-1 font-bold text-gray-600 "> تعديل الفئة الفرعية </div>  </DropdownItem>

                              <DropdownItem textValue="a"   onClick={()=>{ props.togfeat(user)}} startContent={<FaToggleOn style={{marginRight:4}} />} key={"view"} >
                              <div className="py-1 font-bold text-gray-600 ">  إظهار\إخفاء المميزة </div>  </DropdownItem>
            
                              <DropdownItem textValue="a"  onClick={()=>{props.deleteProduct(user.id)}} startContent={<FaTrash className="text-red-600" style={{marginRight:4}} />} key={"del"} >
                              <div className="py-2 font-medium text-red-500">   حذف الفئة الفرعية </div> </DropdownItem>
          
            
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      );
                      break;



          default:
            return cellValue;
        }
      }, []);

      const onNextPage = React.useCallback(() => {
        if (page < pages) {
          setPage(page + 1);
        }
      }, [page, pages]);

      const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
          setPage(page - 1);
        }
      }, [page]);

      const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);

      const onSearchChange = React.useCallback((value) => {
        
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);

      const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
      },[])

      const topContent = React.useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div style={{}}>
            <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder=" أبحث  ..."
                startContent={<SearchIcon className="mx-2" />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
            <div style={{display:props.checkout?"none":"flex"}} className="flex justify-between gap-3 items-end">
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="">
                    <Button endContent={<ChevronDownIcon className="text-small" />} className="bg-moon-100 text-moon-300/60" variant="flat">
                      الحالة 
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className=" sm:flex">
                    <Button endContent={<ChevronDownIcon className="text-small" />} className="bg-moon-100 text-moon-300/60" variant="flat">
                      الأعمدة
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {props.columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                {/* <Button color="primary" endContent={<PlusIcon />}>
                  Add New
                </Button> */}
              </div>
            </div>
            <div style={{display:props.checkout?"none":"block"}} className="flex justify-between items-center">
              <span className="text-default-400 text-small"> عدد  :  {props.data.length} </span>
              <label className="flex items-center text-default-400 text-small">
                عدد الصفوف  :
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        props.data.length,
        onSearchChange,
        hasSearchFilter,
      ]);

      const bottomContent = React.useMemo(() => {
        return (
          <div style={{display:props.checkout?"none":"flex"}} className="py-2 px-2  flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400">
              {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            <Pagination
                        
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Previous
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                Next
              </Button>
            </div>
          </div>
        );
      }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

      return (
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          selectedKeys={selectedKeys}
          selectionMode="none"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={" لا توجد بيانات "} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
