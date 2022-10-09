import * as React from 'react';
import Badge from './Badge';

export default function ActivityItem(props) {
  const { activity, selectActivity, isSelected } = props;

  const classes = () => {
    let classString = "cursor-pointer odd:bg-gray-50 "

    if (isSelected) {
      return classString + "bg-purple-200"
    } else {
      return classString + "hover:bg-purple-100"
    }
  }

  return(
    <tr id={activity.id} className={classes()} onClick={selectActivity}>
      <td className="py-1.5 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 w-1/3">{activity.name()}</td>
      <td className="px-2 py-1.5 text-sm text-gray-900">{activity.startDateShort()}</td>
      <td className="px-2 py-1.5 text-sm text-gray-900 text-center">
        <Badge className={`${activity.bgColorClass()} ${activity.textColorClass()}`}>{activity.type()}</Badge>
      </td>
      <td className="px-2 py-1.5 text-sm text-right text-gray-900">{activity.distance()}</td>
      <td className="px-2 pr-4 py-1.5 text-sm text-right text-gray-900">{activity.totalElevationGain()}</td>
    </tr>
  )
}
