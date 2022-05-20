import * as React from 'react'                         
import L from 'leaflet'        
import Actviti from '../clients/Actviti';
import Activity from '../models/Activity';
import ActivityList from './ActivityList';

function Map() {
  const [activities, setActivities] = React.useState([])
  const [map, setMap] = React.useState()
  const [selectedActivity, setSelectedActivity] = React.useState()

  React.useEffect(() => {
    const newMap = L.map('map').setView([51.505, -0.09], 13);
    const accessToken = 'pk.eyJ1IjoibGV3aXN5b3VsIiwiYSI6ImNqYzM3a3lndjBhOXQyd24zZnVleGh3c2kifQ.qVH2-BA02t3p62tG72-DZA';

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      tileSize: 512,
      id: 'mapbox/streets-v11',
      zoomOffset: -1,
      accessToken: accessToken
    }).addTo(newMap);

    setMap(newMap)

    Actviti.activities()
      .then(res => {
        console.log(res)

        const activityInstances = res.data.map((activity) => { return new Activity(activity, newMap, selectActivity) })

        setActivities(activityInstances)
      })
      .catch(console.error)
  }, [])

  React.useEffect(() => {
    if (activities.length == 0) { return }

    activities.forEach(activity => activity.removeFromMap())
    activities.forEach(activity => activity.addToMap())
    const fg = L.featureGroup(activities.map(activity => activity.layer))
    map?.flyToBounds(fg.getBounds(), { duration: 2 })

  }, [activities])

  React.useEffect(() => {
    if (!selectedActivity) {
      map?.invalidateSize()
      return
    }

    const nonSelectedActivities = activities.filter((activity) => {
      return activity !== selectedActivity      
    })

    nonSelectedActivities.forEach((activity) => { activity.sendToBackground() })

    selectedActivity.flyTo()
    map.invalidateSize()
  }, [selectedActivity])

  const selectActivity = (activity) => {
    if (selectedActivity) {
      if (selectedActivity === activity) {
        setSelectedActivity(undefined);
      } else {
        setSelectedActivity(activity);
      }
    } else {
      setSelectedActivity(activity);
    }
  }

  const activityList = () => {
    return (
      <ActivityList
        isLoading={false}
        activities={activities}
        selectActivity={selectActivity}
        selectedActivity={selectedActivity}
      />
    )
  }
                            
  return (
      <div className="w-full flex flex-col justify-end">
        <div className="h-full w-full flex-1" id="map">
        </div>
        <div id="listContainer" className="overflow-auto h-72 max-h-72">
          {activityList()}
        </div>
      </div>
  )                   
}                                                       
                                        
// // Use it if you don't plan to use "remount"                
// document.addEventListener('DOMContentLoaded', () => {     
//   ReactDOM.render(<Map />, document.getElementById('Map'))                  
// })                                                    
                                                        
export default Map