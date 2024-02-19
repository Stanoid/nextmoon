import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Theme } from '../local';
import { BsCheck,BsChevronDown } from 'react-icons/bs';
import { IoShirtSharp } from "react-icons/io5";

import { MdChevronDown } from 'react-icons/md';
const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },

  
]



import React from 'react'

function Drop() {
    const [selected, setSelected] = useState(people[0])

    return (
      <div className=" z-20 ">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative m-1 text-black">
            <Listbox.Button className="relative w-full cursor-default rounded-lg my-1 bg-white py-1 pl-3 pr-10 text-left shadow-md focus:outline-none
             focus-visible:border-indigo-500 focus-visible:ring-2
             --tw-ring-color:FFAFA9 sm:text-sm focus-visible:ring-offset-2
              --tw-ring-offset-color: #FFAFA9;
              "
              style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
              }}
              >
                <span style={{padding:5,color:Theme.primary}}><IoShirtSharp/></span>
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-2 pr-2">
               <BsChevronDown
               style={{color:Theme.primary}}
               />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <BsCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    )
  
}

export default Drop

