import axios from 'axios'

const Actviti = {
  activities: () => {
    return axios.get("/activities.json")
  }
}

export default Actviti