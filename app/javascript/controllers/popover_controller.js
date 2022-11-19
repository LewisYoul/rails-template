import { Controller } from "@hotwired/stimulus"
import L from 'leaflet'

export default class extends Controller {
  static targets = ['trigger', 'popover']

  static values = {}

  connect() {
    L.DomEvent.disableClickPropagation(this.popoverTarget)
    L.DomEvent.disableScrollPropagation(this.popoverTarget)
  }

  toggle() {
    console.log('tig')
    this.popoverTarget.classList.toggle('hidden')
  }
}
