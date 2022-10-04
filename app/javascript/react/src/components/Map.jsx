import React, { useState, useEffect } from 'react'
import L from 'leaflet'        
import Actviti from '../clients/Actviti';
import Activity from '../models/Activity';
import ActivityList from './ActivityList';
import Panel from './Panel';
import { debounce } from 'debounce'
import MultiSelect from './MultiSelect';
import DateFilter from './DateFilter';

function Map() {
  const ACTIVITY_TYPES = ['AlpineSki', 'BackcountrySki', 'Canoeing', 'Crossfit', 'EBikeRide', 'Elliptical', 'EMountainBikeRide', 'Golf', 'GravelRide', 'Handcycle', 'Hike', 'IceSkate', 'InlineSkate', 'Kayaking', 'Kitesurf', 'MountainBikeRide', 'NordicSki', 'Ride', 'RockClimbing', 'RollerSki', 'Rowing', 'Run', 'Sail', 'Skateboard', 'Snowboard', 'Snowshoe', 'Soccer', 'StairStepper', 'StandUpPaddling', 'Surfing', 'Swim', 'TrailRun', 'Velomobile', 'VirtualRide', 'VirtualRun', 'Walk', 'WeightTraining', 'Wheelchair', 'Windsurf', 'Workout', 'Yoga'].sort();
  const initialLoadingMessage = 'Fetching your activities';
  const importingFromStravaMessage = 'Importing your activities from Strava. This may take a moment...';
  const [activities, setActivities] = useState([])
  const [map, setMap] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ activity_types: ACTIVITY_TYPES })
  const [loadingMessage, setLoadingMessage] = useState(initialLoadingMessage)
  const [selectedActivity, setSelectedActivity] = useState()

  useEffect(() => {
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

    const searchParams = new URLSearchParams(window.location.search)

    if (searchParams.get('first_login')) {
      importActivities(newMap)
    } else {
      fetchActivities(newMap, filters)
    }
  }, [])

  useEffect(() => {
    if (activities.length == 0) { return }

    activities.forEach(activity => activity.addToMap())
    const fg = L.featureGroup(activities.map(activity => activity.layer))
    map?.flyToBounds(fg.getBounds(), { duration: 2 })

  }, [activities])

  useEffect(() => {
    const nonSelectedActivities = activities.filter((activity) => {
      return activity !== selectedActivity      
    })

    nonSelectedActivities.forEach((activity) => { activity.sendToBackground() })

    if (selectedActivity) { selectedActivity.flyTo() }

    map?.invalidateSize()
  }, [selectedActivity])

  const fetchActivities = (newMap, params = {}) => {
    setLoadingMessage(initialLoadingMessage)

    Actviti.activities(params)
      .then(res => {
        const activityInstances = res.data.map((activity) => { return new Activity(activity, newMap, selectActivity) })
        activities.forEach(activity => activity.removeFromMap())

        setActivities(activityInstances)
        setIsLoading(false)
      })
      .catch(console.error)
  }

  const importActivities = (newMap) => {
    setLoadingMessage(importingFromStravaMessage)

    Actviti.importActivities()
      .then(res => {
        removeSearchParamsFromURL()
        fetchActivities(newMap)
      })
      .catch(console.error)
  }

  const removeSearchParamsFromURL = () => {
    window.history.pushState({}, document.title, "/");
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
    setLoadingMessage(importingFromStravaMessage)
    setIsLoading(true)
    closePanel()

    Actviti.refreshActivities()
      .then(() => fetchActivities(map, filters))
      .catch(console.error)
  }

  const applyTypeFilters = (newFilters) => {
    let typesToFilter = []

    newFilters.forEach(filter => {
      if (filter.isChecked) { typesToFilter.push(filter.value) }
    })

    let filtersDup = { ...filters }
    filtersDup.activity_types = typesToFilter

    fetchActivities(map, filtersDup)
    setFilters(filtersDup)
    setIsLoading(true)
    setShowFilters(false)
  }

  const refreshButton = () => {
    if (isLoading) return null

    return (
      <button onClick={refreshActivities} className="shadow-md absolute m-4 z-500 top-0 right-0 whitespace-nowrap inline-flex items-center justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-white hover:bg-gray-100 text-purple-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="ml-1">Refresh Activities</span>
      </button>
    )
  }

  const filtersBar = () => {
    const options = ACTIVITY_TYPES.map(option => { return { value: option, label: option, isChecked: true } })

    return(
      <div className="absolute m-4 z-500 bottom-0 left-0 flex">
        <input onChange={applySearch} className="shadow-md whitespace-nowrap inline-flex items-center rounded-md justify-center px-2 py-1 border border-transparent shadow-sm text-base font-medium bg-white hover:bg-gray-100"></input>
        <MultiSelect
          key={1}
          onChange={applyTypeFilters}
          className="flex items-center bg-white p-2 rounded-md ml-2 shadow-md relative"
          triggerContent={<span>Type ({filters.activity_types.length})</span>}
          options={options}
        />
        <DateFilter onClose={applyDateFilters} />
        {/* <div className="flex items-center bg-white p-2 rounded-md ml-2 shadow-md">
          <span>Date</span>
        </div>
        <div className="flex items-center bg-white p-2 rounded-md ml-2 shadow-md">
          <span>Distance</span>
        </div> */}
      </div>
    )
  }

  const applyDateFilters = (dateFilters) => {
    const startDate = dateFilters[0]
    const endDate = dateFilters[1]
    console.log('got filters', dateFilters)

    let newFilters = Object.assign({}, filters)

    newFilters['start_date'] = startDate
    newFilters['end_date'] = endDate

    setFilters(newFilters)
    setIsLoading(true)
    fetchActivities(map, newFilters)
    setShowFilters(false)
  }

  // todo this is overwriting any existing filters
  const applySearch = debounce((event) => {
    console.log('map', map)
    const searchTerm = event.target.value
    let filters = {}

    if (searchTerm !== '') {
      filters['name'] = searchTerm
    }

    setFilters(filters)
    setIsLoading(true)
    fetchActivities(map, filters)
    setShowFilters(false)
  }, 400)

  const activityList = () => {
    return (
      <ActivityList
        loadingMessage={loadingMessage}
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
            {filtersBar()}
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