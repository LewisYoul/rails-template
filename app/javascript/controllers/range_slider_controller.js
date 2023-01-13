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
    step: Number,
    decimalPlaces: Number
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
      format: wNumb({ decimals: this.decimalPlacesValue }),
    });

    this.sliderTarget.noUiSlider.on('slide', (values) => {
      const [min, max] = values

      this.setSliderValues(min, max)
    })
    
    this.sliderTarget.noUiSlider.on('change', (values) => {
      const [min, max] = values

      let filters = {}

      filters[this.minNameValue] = min
      filters[this.maxNameValue] = max

      this.filterOutlet.updateFilters(filters)
    })

    this.reset()
  }

  setSliderValues(min, max) {
    console.log('y', this.stepValue === 0.5)
    if (this.stepValue === 0.5) {
      console.log('min l', String(Number(min)))
      if (Number(min) % 1 === 0) {
        this.minTarget.innerHTML = `${Number(min)}h`
      } else {
        this.minTarget.innerHTML = `${min[0]}h 30m`
      }

      if (Number(max) % 1 === 0) {
        this.maxTarget.innerHTML = Number(max) === this.maxValue ? `> ${this.maxValue}h` : `${Number(max)}h`
      } else {
        this.maxTarget.innerHTML = `${max[0]}h 30m`
      }
    } else {
      this.minTarget.innerHTML = Number(min)
      this.maxTarget.innerHTML = Number(max) === this.maxValue ? `> ${this.maxValue}` : Number(max)
    }
  }

  reset() {
    this.sliderTarget.noUiSlider.reset()
    this.setSliderValues(this.minValue, this.maxValue)
  }
}
