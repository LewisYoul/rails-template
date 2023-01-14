import { Controller } from "@hotwired/stimulus"
import noUiSlider from 'nouislider';
import wNumb from "wnumb";

export default class extends Controller {
  static outlets = [ "filters", "popover" ]

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

      if (Number(min) === this.minValue && Number(max) === this.maxValue) {
        this.updateTriggerText()
      } else {
        const [minText, maxText] = this.generateSliderText(min, max)

        this.updateTriggerText(`${minText} to ${maxText}`)
      }
    })

    this.reset()
  }

  generateSliderText(min, max) {
    let minText, maxText;

    if (this.stepValue === 0.5) {
      if (Number(min) % 1 === 0) {
        minText = `${Number(min)}h`
      } else {
        minText = `${min[0]}h 30m`
      }

      if (Number(max) % 1 === 0) {
        maxText = Number(max) === this.maxValue ? `> ${this.maxValue}h` : `${Number(max)}h`
      } else {
        maxText = `${max[0]}h 30m`
      }
    } else {
      minText = Number(min)
      maxText = Number(max) === this.maxValue ? `> ${this.maxValue}` : Number(max)
    }

    return [minText, maxText]
  }

  setSliderValues(min, max) {
    const [minText, maxText] = this.generateSliderText(min, max)

    this.minTarget.innerHTML = minText
    this.maxTarget.innerHTML = maxText
  }

  updateTriggerText(text = null) {
    this.popoverOutlets[0].updateTriggerText(text)
  }

  reset() {
    this.sliderTarget.noUiSlider.reset()
    this.setSliderValues(this.minValue, this.maxValue)
    this.updateTriggerText()
  }
}
