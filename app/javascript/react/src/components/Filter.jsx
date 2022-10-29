import React, { useState, useRef, useEffect } from 'react'
import clickOutside from '../utils/clickOutside'

function Filter(props) {
  const { onClose } = props;
  const popoverRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!isOpen) { onClose() }
  }, [isOpen])

  clickOutside(popoverRef, () => {
    setIsOpen(false)
  })

  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  const popoverContent = () => {
    if (!isOpen) { return null }

    return (
      <div ref={popoverRef} className="bg-white absolute left-0 bottom-10 w-48 z-600 shadow-md rounded-md px-2 py-2">
        <div>{props.children}</div>
      </div>
    )
  }

  return (
    <div className="flex items-center bg-white rounded-md ml-2 shadow-md relative">
      <div className="flex items-center p-2 cursor-pointer" onClick={togglePopover}>
        <button>
          {props.triggerContent}
        </button>
      </div>
      {popoverContent()}
    </div>
  )
}

export default Filter