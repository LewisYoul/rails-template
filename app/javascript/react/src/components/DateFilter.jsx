import React, { useState, useRef, useEffect } from 'react'
import Filter from './Filter'

function DateFilter(props) {

  return(
    <Filter triggerContent={<span>Date</span>}>
      <div className="flex justify-between"><span>From</span><input type="date"></input></div>
      <div className="flex justify-between"><span>To</span><input type="date"></input></div>

      <div className="mt-2 flex justify-between">
        <button className="hover:underline" onClick={() => {}}>Clear</button>
      </div>
    </Filter>
  )
}

export default DateFilter;