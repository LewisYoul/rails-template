import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['tab']

  connect() {
    console.log('tabs')
  }

  display(e) {
    const selectedTabId = Number(e.target.dataset.tabId)
    console.log(selectedTabId)

    this.tabTargets.forEach(tab => {
      const tabId = Number(tab.dataset.tabId)

      if (selectedTabId == tabId) {
        tab.classList.remove('hidden')
      } else {
        tab.classList.add('hidden')
      }
    })
  }
}
