import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['input', 'item']

  filter(e) {
    const filterTerm = e.target.value.toLowerCase()

    this.itemTargets.forEach(item => {
      const itemFilterName = item.dataset.browsersearchTerm.toLowerCase()

      if (itemFilterName.includes(filterTerm)) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
  }
}
