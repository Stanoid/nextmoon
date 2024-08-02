import { useState } from "react";
import ReactSearchBox from "react-search-box";


import React from 'react'

function SearchEl() {
const [data,setData] = useState([
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ])



  return (
   
    <ReactSearchBox
    placeholder="Placeholder"
    value="Doe"
    data={data}
    callback={(record) => 
  />

  )
}

export default SearchEl

