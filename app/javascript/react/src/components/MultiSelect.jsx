import React, { useState, useRef, useEffect } from 'react'
import clickOutside from '../utils/clickOutside'
import L from 'leaflet'    

function MultiSelect(props) {
  const { options, onChange, className } = props
  const popoverRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [stateOptions, setStateOptions] = useState(options)
  const [searchTerm, setSearchTerm] = useState('')
  const firstUpdate = useRef(true);

  //  this needs doing so onchange is only triggered when the options change
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!isOpen) { onChange(stateOptions) }
  }, [isOpen])

  clickOutside(popoverRef, () => {
    setIsOpen(false)
  })

  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  const toggleFilter = (option, e) => {
    const isChecked = e.target.checked

    let dupped = stateOptions.map((opt) => opt)
    let index = dupped.findIndex(opt => opt.value === option.value )
    dupped[index].isChecked = isChecked

    console.log('sos', dupped)
    setStateOptions(dupped)
  }

  const clearOpts = () => {
    console.log('111')
    let modded = options.map(option => { 
      option.isChecked = false
      return option
    })

    setSearchTerm('')

    console.log('od', modded)

    setStateOptions(modded)
  }

  const selectAll = () => {
    console.log('111')
    let modded = stateOptions.map(option => { 
      option.isChecked = true
      return option
    })

    console.log('od', modded)

    setStateOptions(modded)
  }

  const handleFilter = (event) => {
    const searchValue = event.target.value

    setSearchTerm(searchValue)

    let stateOptionsForDisplay = options.filter(option => {
      return option.label.toLowerCase().includes(searchValue)
    })
    console.log('opts', stateOptionsForDisplay)

    setStateOptions(stateOptionsForDisplay)
  }

  const popoverContent = () => {
    if (!isOpen) { return null }

    return (
      <div ref={popoverRef} className="bg-white absolute left-0 bottom-10 w-48 z-600 shadow-md rounded-md px-2 py-2">
        <div className="relative">
          <input className="w-full border-b border-gray-400 py-1 pl-1" type="text" value={searchTerm} onChange={handleFilter}></input>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div id="popped" className="overflow-y-scroll h-48 mt-1 px-1">
          {
            stateOptions.map((option) => {
              return (
                <div key={option.label} className="hover:text-gray-600 flex items-center">
                  <input onChange={(e) => { toggleFilter(option, e) }} type="checkbox" id={option.label} name={option.label} checked={option.isChecked} defaultChecked={option.isChecked} value="Bike"></input>
                  <label htmlFor={option.label} className="w-full ml-1 cursor-pointer">{option.label}</label>
                </div>
              )
            })
          }
        </div>
        <div className="mt-2 flex justify-between">
          <button className="hover:underline" onClick={clearOpts}>Clear</button>
          <button className="hover:underline" onClick={selectAll}>All</button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center" onClick={togglePopover}>
        <button>
          {props.triggerContent}
        </button>
      </div>
      {popoverContent()}
    </div>
  )
}

export default MultiSelect;