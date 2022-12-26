import { Controller } from "@hotwired/stimulus"
import { debounce } from 'debounce'
import Litepicker from "litepicker"
export default class extends Controller {
  static targets = ['search', 'searchButton', 'checkbox']

  static values = {}

  connect() {
    this.filters = {
      name: '',
      activity_types: []
    }
    console.log('filters controller')

    this.picker = new Litepicker({
      element: document.getElementById('datepicker'),
      singleMode: false,
      numberOfMonths: 2,
      numberOfColumns: 2,
      resetButton: true,
      position: 'top left',
      setup: (picker) => {
        picker.on('selected', (from, to) => {
          const fromString = from.dateInstance.toLocaleDateString(from.lang)
          // some action
          console.log(from, to)
          if (from) {
            this.filters.start_date = fromString
          }

          const toString = to.dateInstance.toLocaleDateString(to.lang)

          if (to) {
            this.filters.end_date = toString
          }

          document.getElementById('datepicker').innerText = `${fromString} - ${toString}`
          this.applyFilters()
        });

        picker.on('clear:selection', () => {
        });
      },
    })
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
    this.picker.clearSelection()
    document.getElementById('datepicker').innerText = "Date"
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
