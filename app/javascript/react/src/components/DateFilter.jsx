import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment';
import Filter from './Filter'

function DateFilter(props) {
  const { startDate, endDate, displayText, onApply } = props;
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  useEffect(() => {
    setLocalStartDate(startDate)
    setLocalEndDate(endDate)
  }, [startDate, endDate])

  const stageDateSelection = (dateType, date) => {
    if (dateType === 'start') {
      if (endDate && moment(endDate).isBefore(date)) {
        return
        // TODO: pop a toast to explain that start must be <= end
      }
      
      setLocalStartDate(date)
    } else if (dateType === 'end') {
      if (startDate && moment(date).isBefore(startDate)) {
        return
        // TODO: pop a toast to explain that start must be <= end
      }

      setLocalEndDate(date)
    }
  }

  const clearDates = () => {
    setLocalStartDate('')
    setLocalEndDate('')
  }

  return(
    <Filter
      onApply={() => onApply([localStartDate, localEndDate])}
      onClear={clearDates}
      triggerContent={<span>{displayText}</span>}
    >
      <div className="flex justify-between"><span>From</span><input type="date" value={localStartDate} onChange={(event) => { stageDateSelection('start', event.target.value) }}></input></div>
      <div className="flex justify-between"><span>To</span><input type="date" value={localEndDate} onChange={(event) => { stageDateSelection('end', event.target.value) }}></input></div>
    </Filter>
  )
}

export default DateFilter;