import * as React from 'react'
import clickOutside from '../utils/clickOutside';

const ActivityFilters = (props) => {
  const { onClose, onApply, initialFilters } = props;
  const modalRef = React.useRef(null)
  const [name, setName] = React.useState(initialFilters.name)

  clickOutside(modalRef, onClose)

  const applyFilters = () => {
    const filters = {
      name: name
    }

    onApply(filters)
  }

  const clearFilters = () => {
    setName('')
  }

  return (
    <div className="relative z-600" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div ref={modalRef} className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
            <form>
              <div className="w-full">
                <label htmlFor="name">Name</label>
                <input autoFocus value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="name" id="name" className="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-2 py-2"></input>
              </div>
              <div className="mt-5 flex justify-between">
                <button type="button" onClick={clearFilters} className="py-2 text-base font-medium underline sm:text-sm">Clear all</button>
                <button onClick={applyFilters} type="submit" className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm">Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityFilters;