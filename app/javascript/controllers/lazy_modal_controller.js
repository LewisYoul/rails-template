import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['lazyModal', 'turboFrame', 'wrapper']
  static values = { path: String }

  connect() {
    console.log('lazyModal')
  }

  open() {
    this.lazyModalTarget.classList.remove('hidden')
  }
  
  close() {
    this.lazyModalTarget.classList.add('hidden')
    // This removes the old turbo frame and creates a new one that will lazy load when we reopen the modal
    //  Can certainly be generalised
    this.wrapperTarget.innerHTML = `<turbo-frame loading="lazy" data-lazyModal-target="turboFrame" id="lazyModal" src="${this.pathValue}"></turbo-frame>`
  }
}
