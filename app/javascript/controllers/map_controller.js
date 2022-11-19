import { Controller } from "@hotwired/stimulus"
import Map from "../models/map"
import Activity from "../models/activity"

export default class extends Controller {
  static targets = ['table', 'selected', 'tableRow', 'panel']

  static values = {
    selectedActivity: Object,
    activities: { type: Array, default: [] }
  }

  connect() {
    this.map = new Map('map', {
      onActivityClick: this.toggleActivityById
    })
  }
  
  activitiesValueChanged(value, previousValue) {
    if (this.map) { this.map.removeAllActivities() }
    console.log('v', this.activitiesValue)
    const activities = this.activitiesValue.map((activity) => { return new Activity(activity, this.map) })

    if (activities.length <= 0) { return }

    this.map.addActivities(activities)
  }

  selectedActivityValueChanged(value, previousValue) {
    if ((Object.keys(this.selectedActivityValue).length === 0) && previousValue === undefined) {
      return
    } 
    
    if (Object.keys(this.selectedActivityValue).length === 0) {
      this.map.blurActivities()

      this.tableRowTargets.forEach((row) => {
        row.classList.add("odd:bg-gray-50", "hover:bg-purple-100")
        row.classList.remove("bg-purple-200")
      })
      
    } else {
      this.map.focusActivity(this.selectedActivityValue.id)
    }
  }
  
  toggleActivity(e) {
    const id = Number(e.currentTarget.dataset.activityId)
    
    this.toggleActivityById(id)
  }

  toggleActivityById = (id) => {
    let button

    this.tableRowTargets.forEach((row) => {
      const idOfCurrentRow = Number(row.dataset.activityId)

      if (idOfCurrentRow === id) {
        if (id !== this.selectedActivityValue.id) {
          row.classList.remove("odd:bg-gray-50", "hover:bg-purple-100")
          row.classList.add("bg-purple-200")

          button = document.getElementById(`select_activity_row_${id}`)
        } else {
          row.classList.add("odd:bg-gray-50", "hover:bg-purple-100")
          row.classList.remove("bg-purple-200")

          button = document.getElementById(`deselect_activity_row_${id}`)
        }
      } else {
        row.classList.add("odd:bg-gray-50", "hover:bg-purple-100")
        row.classList.remove("bg-purple-200")
      }
    })

    button.click()
  }
  
  selectedTargetConnected(el) {
    const selectedActivity = el.dataset.selectedActivity

    if (selectedActivity) {
      this.selectedActivityValue = JSON.parse(selectedActivity)
    } else {
      this.selectedActivityValue = {}
    }
  }

  tableTargetConnected(el) {
    this.activitiesValue = JSON.parse(el.dataset.activities)
  }

  panelTargetConnected() {
    this.map.fitToContainer()
  }

  panelTargetDisconnected() {
    this.map.fitToContainer()
  }
}
