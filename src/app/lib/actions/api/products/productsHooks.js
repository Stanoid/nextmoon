'use client'
import React from 'react'
import { cache } from 'react'
import {useSWR} from 'swr'
import {API_URL} from "../../../../local"
import * as fetcher from "./productsfetchers"



export async function productHook () {

const res= await fetcher.homeProductsFetcher();
return res;

// try {
//   const { data, error, isLoading } = useSWR("products", fetcher.homeProductsFetcher);

//   return {
//     products: data,
//     isLoading,
//     isError: error
//   }

// } catch (error) {
//   console.log(error);
//   return null
// }

 
  
  }
  



  
export async function useHomeProducts() {
    return await productHook();
  }
  
