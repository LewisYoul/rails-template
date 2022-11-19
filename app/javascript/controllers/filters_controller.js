import { Controller } from "@hotwired/stimulus"
import { debounce } from 'debounce'

export default class extends Controller {
  static targets = ['search', 'searchButton', 'checkbox']

  static values = {}

  connect() {
    this.filters = {
      name: '',
      activity_types: []
    }
    console.log('filters controller')
  }

  checkboxChanged() {
    let activityTypes = []

    this.checkboxTargets.forEach((checkbox) => {
      if (checkbox.checked) {
        activityTypes = activityTypes.concat(checkbox.value)
      }
    })

    this.filters.activity_types = activityTypes
  }

  search = debounce((event) => {
    this.filters.name = event.target.value

    this.applyFilters()
  }, 400)

  applyFilters() {
    const params = this.buildParams(this.filters)
    this.searchButtonTarget.href = `/activities?${params}`
    this.searchButtonTarget.click()
  }

  clearCheckboxes() {
    this.checkboxTargets.forEach((checkbox) => { checkbox.checked = false })
    this.checkboxChanged()
  }

  selectAllCheckboxes() {
    this.checkboxTargets.forEach((checkbox) => { checkbox.checked = true })
    this.checkboxChanged()
  }

  clearFilters() {
    this.filters = {}
    this.searchTarget.value = ''
    this.searchButtonTarget.href = `/activities`
    this.searchButtonTarget.click()
  }

  buildParams(data) {
    const params = new URLSearchParams()

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
          value.forEach(value => params.append(`${key}[]`, value.toString()))
      } else {
          params.append(key, value.toString())
      }
    });

    return params.toString()
  }
}
