import * as React from 'react'
import L from 'leaflet'        
import Actviti from '../clients/Actviti';
import Activity from '../models/Activity';
import ActivityList from './ActivityList';
import Panel from './Panel';

function Map() {
  const [activities, setActivities] = React.useState([])
  const [map, setMap] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
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

    fetchActivities(newMap)
  }, [])

  React.useEffect(() => {
    if (activities.length == 0) { return }

    activities.forEach(activity => activity.removeFromMap())
    activities.forEach(activity => activity.addToMap())
    const fg = L.featureGroup(activities.map(activity => activity.layer))
    map?.flyToBounds(fg.getBounds(), { duration: 2 })

  }, [activities])

  React.useEffect(() => {
    const nonSelectedActivities = activities.filter((activity) => {
      return activity !== selectedActivity      
    })

    nonSelectedActivities.forEach((activity) => { activity.sendToBackground() })

    if (selectedActivity) { selectedActivity.flyTo() }

    map?.invalidateSize()
  }, [selectedActivity])

  const fetchActivities = (newMap) => {
    Actviti.activities()
      .then(res => {
        console.log(res)

        const activityInstances = res.data.map((activity) => { return new Activity(activity, newMap, selectActivity) })

        setActivities(activityInstances)
        setIsLoading(false)
      })
      .catch(console.error)
  }

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

  const closePanel = () => {
    selectActivity(undefined)
  }

  const refreshActivities = () => {
    setIsLoading(true)
    closePanel()

    Actviti.refreshActivities()
      .then(() => {
        console.log('refreshed')
        fetchActivities(map)
      })
      .catch(console.error)
  }

  const refreshButton = () => {
    if (isLoading) return null

    return (
      <button onClick={refreshActivities} className="shadow-md absolute m-4 z-500 top-0 right-0 whitespace-nowrap inline-flex items-center justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-white hover:bg-gray-100 text-purple-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="ml-1">Refresh Activities</span>
      </button>
    )
  }

  const activityList = () => {
    return (
      <ActivityList
        isLoading={isLoading}
        activities={activities}
        selectActivity={selectActivity}
        selectedActivity={selectedActivity}
      />
    )
  }
                            
  return (
      <div className="w-full flex flex-col justify-end">
        <div className="w-full h-full flex">
          <div className="h-full w-full flex-1" id="map">
            {refreshButton()}
          </div>
          {selectedActivity ? 
            <Panel activity={selectedActivity} closePanel={closePanel}/>
          : null}
        </div>
        <div id="listContainer" className="overflow-auto h-96 max-h-96">
          {activityList()}
        </div>
      </div>
  )                   
}                                                       
                                        
// Use it if you don't plan to use "remount"                
// document.addEventListener('DOMContentLoaded', () => {     
//   ReactDOM.render(<Map />, document.getElementById('map'))                  
// })                                                    
                                                        
export default Map