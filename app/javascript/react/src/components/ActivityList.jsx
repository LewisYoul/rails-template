import * as React from 'react';
import ActivityItem from './ActivityItem';
import LoaderWithText from './LoaderWithText';

export default function ActivityList(props) {
  const { isLoading, loadingMessage, activities, selectActivity, selectedActivity } = props;
  const [focussedActivity, setFocussedActivity] = React.useState();
  const [hoveredActivity, setHoveredActivity] = React.useState();
  // useEffect(() => {
  //   let featureCollection = {
  //     "type": 'FeatureCollection',
  //     "features": activities.map(activity => {
  //       return {
  //         type: "Feature",
  //         geometry: activity.asGeoJSON()
  //       }
  //     })
  //   }

  //   const boundingBox = bbox(featureCollection as any)
  //   // Should probably pass the map around
  //   activities[0]?.map.fitBounds(boundingBox, { padding: 80 })
  // }, [activities])

  // useEffect(() => {
  //   if (!focussedActivity) { return };

  //   focussedActivity.flyTo();    
  // }, [focussedActivity])

  // useEffect(() => {
  //   if (!hoveredActivity) {
  //     activities.forEach(activity => activity.mouseleave())
  //   } else {
  //     activities.forEach(activity => activity.hide())
  //     hoveredActivity.mouseover()
  //   }  
  // }, [hoveredActivity])

  const content = () => {
    if (isLoading) { return <LoaderWithText width={50} height={50} text={loadingMessage} /> }

    return (
      <div className="relative ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full table-fixed">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th scope="col" className="sticky top-0 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-400 sm:pl-6 w-1/3">NAME</th>
              <th scope="col" className="sticky top-0 px-2 py-2 text-left text-sm font-medium text-gray-400">DATE</th>
              <th scope="col" className="sticky top-0 px-2 py-2 text-center text-sm font-medium text-gray-400">TYPE</th>
              <th scope="col" className="sticky top-0 px-2 py-2 text-right text-sm font-medium text-gray-400">DIST (km)</th>
              <th scope="col" className="sticky top-0 px-2 py-2 pr-4 text-right text-sm font-medium text-gray-400">ELEV (m)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {activities.map((activity) => {
              return (
                <ActivityItem
                  key={Math.random()}
                  onMouseOver={() => { }}
                  onMouseLeave={() => { }}
                  selectActivity={() => { selectActivity(activity) } }
                  activity={activity}
                  isSelected={selectedActivity === activity}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return(
    <div className="h-full overflow-auto">
      {content()}
    </div>
  )
}
