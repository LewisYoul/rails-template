import { Controller } from "@hotwired/stimulus"
import noUiSlider from 'nouislider';
import wNumb from "wnumb";

export default class extends Controller {
  static outlets = [ "filters" ]

  static targets = ['min', 'max', 'slider']

  static values = {
    min: Number,
    max: Number,
    minName: String,
    maxName: String,
    step: Number
  }

  connect() {
    this.filterOutlet = this.filtersOutlets[0]

    noUiSlider.create(this.sliderTarget, {
      start: [this.minValue, this.maxValue],
      connect: true,
      range: {
        'min': this.minValue,
        'max': this.maxValue
      },
      step: this.stepValue,
      behaviour: 'tap-drag',
      format: wNumb({ decimals: 0 }),
    });

    this.sliderTarget.noUiSlider.on('slide', (values) => {
      const [min, max] = values

      this.minTarget.innerHTML = min
      this.maxTarget.innerHTML = Number(max) === this.maxValue ? `> ${max}` : max
    })
    
    this.sliderTarget.noUiSlider.on('change', (values) => {
      const [min, max] = values

      let filters = {}

      filters[this.minNameValue] = min
      filters[this.maxNameValue] = max

      this.filterOutlet.updateFilters(filters)
    })

    this.sliderTarget.addEventListener('click', (e) => {
      console.log('ch')
      e.stopPropagation()
    })
  }

  reset() {
    this.sliderTarget.noUiSlider.reset()

    this.minTarget.innerHTML = this.minValue
    this.maxTarget.innerHTML = this.maxValue
  }
}
