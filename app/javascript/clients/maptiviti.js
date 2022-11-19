import axios from 'axios'

const Maptiviti = {
  importActivities: () => {
    return axios.get("/activities/import.json")
  },

  activities: (params) => {
    console.log('p', params)
    return axios.get("/activities.json", { params })
  },

  activity: (activityId) => {
    return axios.get(`/activities/${activityId}.json`)
  },

  refreshActivities: () => {
    return axios.get('/activities/refresh')
  }
}

export default Maptiviti