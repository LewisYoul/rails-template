import { Controller } from "@hotwired/stimulus"
import axios from "axios"

export default class extends Controller {
  static outlets = ['filters']
  static targets = ['refreshButton']

  refreshActivities() {
    axios.get('/activities/refresh')
      .then(() => {
        console.log('boop', this.filtersOutlets)
        this.filtersOutlets[0].clearFilters()
      })
      .catch(console.error)
  }
}
