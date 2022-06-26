import axios from 'axios'

const Actviti = {
  importActivities: () => {
    return axios.get("/activities/import.json")
  },

  activities: () => {
    return axios.get("/activities.json")
  },

  activity: (activityId) => {
    return axios.get(`/activities/${activityId}.json`)
  },

  refreshActivities: () => {
    return axios.get('/activities/refresh')
  }
}

export default Actviti