import React, { useState, useRef, useEffect } from 'react'
import clickOutside from '../utils/clickOutside'
import L from 'leaflet'    

function MultiSelect(props) {
  const { options, onChange, className } = props
  const popoverRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [stateOptions, setStateOptions] = useState(options)
  const firstUpdate = useRef(true);

  useEffect(() => {
    console.log('L', L.DomEvent)
    
  }, [])
  //  this needs doing so onchange is only triggered when the options change
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (document.getElementById('popped')) {
      L.DomEvent.disableScrollPropagation(document.getElementById('popped'))
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
    let modded = stateOptions.map(option => { 
      option.isChecked = false
      return option
    })

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

  const popoverContent = () => {
    if (!isOpen) { return null }

    return (
      <div ref={popoverRef} className="bg-white absolute left-0 bottom-10 w-48 z-600 shadow-md rounded-md px-2 py-2">
        <div id="popped" className="overflow-y-scroll h-48">
          {
            stateOptions.map((option) => {
              console.log('opt', option)
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