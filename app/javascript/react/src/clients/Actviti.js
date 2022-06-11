import axios from 'axios'

const Actviti = {
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