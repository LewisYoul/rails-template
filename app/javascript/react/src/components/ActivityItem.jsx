import * as React from 'react';
import Badge from './Badge';

export default function ActivityItem(props) {
  const { activity, selectActivity, isSelected } = props;

  const classes = () => {
    let classString = "cursor-pointer "

    if (isSelected) {
      return classString + "bg-purple-200"
    } else {
      return classString + "odd:bg-gray-50 hover:bg-purple-100"
    }
  }

  return(
    <tr id={activity.id} className={classes()} onClick={selectActivity}>
      <td className="py-1.5 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 w-1/3">{activity.name()}</td>
      <td className="px-2 py-1.5 text-sm text-gray-900">{activity.startDateLong()}</td>
      <td className="px-2 py-1.5 text-xl text-gray-900 text-center">
        {activity.icon() || activity.activity.activity_type}
      </td>
      <td className="px-2 py-1.5 text-sm text-right text-gray-900">{activity.distance()}</td>
      <td className="px-2 pr-4 py-1.5 text-sm text-right text-gray-900">{activity.totalElevationGain()}</td>
    </tr>
  )
}
