import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['input', 'item']

  connect() {
    console.log('browsersearch')
  }

  filter(e) {
    const filterTerm = e.target.value.toLowerCase()
    console.log(this.itemTargets)
    this.itemTargets.forEach(item => {
      console.log(item.dataset)
      const itemFilterName = item.dataset.browsersearchTerm.toLowerCase()

      if (itemFilterName.includes(filterTerm)) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
  }
}
