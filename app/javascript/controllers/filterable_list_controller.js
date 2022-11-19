import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['search', 'item']

  static values = {}

  connect() {
    console.log('filterableList')
  }

  search() {
    const searchTerm = this.searchTarget.value.toLowerCase()

    this.itemTargets.forEach((item) => {
      if (item.dataset.itemValue.toLowerCase().includes(searchTerm)) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
  }
}
