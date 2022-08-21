import * as React from 'react'
import clickOutside from '../utils/clickOutside'

function MultiSelect(props) {
  const popoverRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)

  clickOutside(popoverRef, () => setIsOpen(false))

  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  const popoverContent = () => {
    if (!isOpen) { return null }

    return (
      <div ref={popoverRef} className="bg-white absolute left-0 bottom-10 w-48 z-600 shadow-md rounded-md px-2 py-2">
        {
          props.options.map((option) => {
            return (
              <div key={option.label} className="flex items-center">
                <input type="checkbox" id={option.label} name={option.label} value="Bike"></input>
                <label for={option.label} className="w-full ml-1 cursor-pointer">{option.label}</label>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div className={props.className}>
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