import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment';
import Filter from './Filter'

function DateFilter(props) {
  const { onClose } = props;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const stageDateSelection = (dateType, date) => {
    if (dateType === 'start') {
      if (endDate && moment(endDate).isBefore(date)) {
        return
        // TODO: pop a toast to explain that start must be <= end
      }
      
      setStartDate(date)
    } else if (dateType === 'end') {
      if (startDate && moment(date).isBefore(startDate)) {
        return
        // TODO: pop a toast to explain that start must be <= end
      }

      setEndDate(date)
    }
  }

  const clearDates = () => {
    setStartDate('')
    setEndDate('')
  }

  return(
    <Filter onClose={() => onClose([startDate, endDate])} triggerContent={<span>Date</span>}>
      <div className="flex justify-between"><span>From</span><input type="date" value={startDate} onChange={(event) => { stageDateSelection('start', event.target.value) }}></input></div>
      <div className="flex justify-between"><span>To</span><input type="date" value={endDate} onChange={(event) => { stageDateSelection('end', event.target.value) }}></input></div>

      <div className="mt-2 flex justify-between">
        <button className="hover:underline" onClick={clearDates}>Clear</button>
      </div>
    </Filter>
  )
}

export default DateFilter;