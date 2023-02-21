import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['trigger', 'image', 'carouselModal', 'carousel']

  connect() {
    console.log('carousel')
  }

  open(e) {
    this.currentImageUrl = e.target.src

    this.addCurrentImage()

    this.carouselModalTarget.classList.remove('hidden')
  }

  close() {
    this.removeCurrentImage()

    this.carouselModalTarget.classList.add('hidden')
  }

  previous() {
    console.log('pi')
    let currentIndex = this.imageUrls().indexOf(this.currentImageUrl)
    let previousIndex = (currentIndex - 1) < 0 ? this.imageUrls().length - 1 : (currentIndex - 1)
    console.log('pi', previousIndex)
    this.currentImageUrl = this.imageUrls()[previousIndex]

    this.removeCurrentImage()
    this.addCurrentImage()
  }

  next() {
    console.log('f')
    let currentIndex = this.imageUrls().indexOf(this.currentImageUrl)
    let nextIndex = (currentIndex + 1) > this.imageUrls().length - 1 ? 0 : (currentIndex + 1)
    this.currentImageUrl = this.imageUrls()[nextIndex]

    this.removeCurrentImage()
    this.addCurrentImage()
  }

  imageUrls() {
    return this.imageTargets.map(i => i.src)
  }

  removeCurrentImage() {
    this.carouselTarget.innerHTML = ''
  }

  addCurrentImage() {
    const image = document.createElement('img')
    image.src = this.currentImageUrl
    image.setAttribute("class", "object-contain h-full w-full")

    this.carouselTarget.appendChild(image)
  }
}
