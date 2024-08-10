import React from 'react'
import { Chart } from "react-google-charts";

import { useEffect,useState } from 'react'
import { Theme } from '../local';
function Dashboard(props) {
useEffect(() => {
  getData()
    

 
}, [])




 const [data1,setData1] = useState([
  ["المنتج", "الأسبوع الحالي", "الإسبوع الماضي "],
  ["ايلا ليمتد اديشن فستان...", 8175000, 8008000],
  ["تشوميل سوار متدلي من الفضة الإسترليني عي...", 3792000, 3694000],
  ["خزانة فستان طويل ملفوف...", 2695000, 2896000],
  ["فستان طويل", 2099000, 1953000],
  ["ايلا ليمتد", 1526000, 1517000],
]);

 const [options1,setOptions1] = useState({
  colors: [Theme.secondary, Theme.secondaryDark],
  title: "مبيعات المنتج مقارنة بالأسبوع الماضي",
  chartArea: { width: "40%" },
  hAxis: {
    title: " المبيعات (ر.س)",
    minValue: 0,
  },
  vAxis: {
    title: "المنتج",
  },
});



 const [data,setData] = useState([
  ["الشهر", "المبيعات", "المسترجعات"],
  ["يناير", 10000, 8000],
  ["فبراير", 12300, 7000],
  ["مارس", 11356, 4000],
  ["أبريل", 23456, 8000],
  ["يونيو", 10456, 3000],
  ["يوليو", 13456, 4000],
  ["أغطسطس", 23456, 6894],
]);

 const [options,setOptions] = useState({
  title: "المبيعات و المسترجعات (ر.س)",
  colors: [Theme.secondary, Theme.primary],
  hAxis: { title: "الشهر", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "90%", height: "70%" },
});


const getData = ()=>{
props.setLod(false)
}




 const [data2,setData2] = useState([
  [
    { type: "number", label: "x" },
    { type: "number", label: "values" },
    { id: "i0", type: "number", role: "interval" },
    { id: "i1", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
  ],
  [1, 100, 90, 110, 85, 96, 104, 120],
  [2, 120, 95, 130, 90, 113, 124, 140],
  [3, 130, 105, 140, 100, 117, 133, 139],
  [4, 90, 85, 95, 85, 88, 92, 95],
  [5, 70, 74, 63, 67, 69, 70, 72],
  [6, 30, 39, 22, 21, 28, 34, 40],
  [7, 80, 77, 83, 70, 77, 85, 90],
  [8, 100, 90, 110, 85, 95, 102, 110],
]);

 const [options2,setOptions2] = useState({
  title: "الدخل الإسبوعي",
  curveType: "function",
  series: [{ color: Theme.primary }],
  intervals: { style: "area" },
  legend: "none",
});



 const [data3,setData3] = useState([
  ["الفئة", "المبيعات "],
  ["بجامات", 11],
  ["سراويل", 2],
  ["لانجري", 122],
  ["ملابس TRD", 12],
  ["جلابية", 7],
]);

 const [options3,setOptions3] = useState({
  title: " الفئات الأعلى مبيعآ ",
  is3D: true,
});




// const [options2,setOptions2] = useState({
//   title: "الدخل الإسبوعي",
//   curveType: "function",
//   series: [{ color: Theme.primary }],
//   intervals: { style: "area" },
//   legend: "none",
// });



 const [data4,setData4] = useState([
  ["الفئية الفرعية", "المبيعات"],
  ["بجامات قصسرة", 11],
  ["بجامات اطفال", 2],
  ["بجامات نوم", 9],
  ["سراويل قصيرة ", 5],

]);

 const [options4,setOptions4] = useState({
  title: " الفئات الفرعية الأكثر مبيعآ ",
  is3D: true,
});






    
  return (
    <div className='' >



<div
className="flex flex-col lg:grid sm:flex sm:flex-row"
style={{
    overflowX:"hidden",
    maxWidth:"100vw",
gap:20,
gridTemplateAreas:`
'namear  namear  nameen nameen' 
'section section section section' 
'pi1 pi1 pi2 pi2' 


`

   }} >


    <div className='w-full shadow-sm hover:shadow-xl transition-shadow p-3 ' style={{gridArea:"namear"}}>
    <div className='px-3 font-bold text-moon-200 text-md ' > المبيعات و المسترجعات : </div>
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />

    </div>

    <div className='w-full shadow-sm hover:shadow-xl transition-shadow p-3 '  style={{gridArea:"nameen"}}>
    <div className='px-3 font-bold text-moon-200 text-md ' > المبيعات  الأسبوعية : </div>
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data1}
      options={options1}
    />

    </div>
    
    
    <div className='w-full shadow-sm hover:shadow-xl transition-shadow p-3 ' style={{gridArea:"section"}}>
    <div className='px-3 font-bold text-moon-200 text-md ' >  الدخل الإسبوعي  : </div>
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data2}
      options={options2}
    />
  
    </div>


    <div className='w-full shadow-sm hover:shadow-xl transition-shadow p-3 ' style={{gridArea:"pi1"}}>
    <div className='px-3 font-bold text-moon-200 text-md ' >   الفئات الأعلى مبيعآ : </div>
    <Chart
      chartType="PieChart"
      data={data3}
      options={options3}
      width={"100%"}
      height={"400px"}
    />

  
    </div>

    <div className='w-full shadow-sm hover:shadow-xl transition-shadow p-3 ' style={{gridArea:"pi2"}}>
    <div className='px-3 font-bold text-moon-200 text-md ' >  الفئات الفرعية الأعلى مبيعآ  : </div>
    <Chart
      chartType="PieChart"
      data={data4}
      options={options4}
      width={"100%"}
      height={"400px"}
    />

  
    </div>



 



  
  

   </div>
      
     
    </div>
  )
}

export default Dashboard