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

    const slider = this.sliderTarget;

    noUiSlider.create(slider, {
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

      slider.noUiSlider.on('slide', (values) => {
        const [min, max] = values

        this.minTarget.innerHTML = min
        this.maxTarget.innerHTML = Number(max) === this.maxValue ? `> ${max}` : max
      })
      
      slider.noUiSlider.on('change', (values) => {
        const [min, max] = values

        let filters = {}

        filters[this.minNameValue] = min
        filters[this.maxNameValue] = max

        this.filterOutlet.updateFilters(filters)
      })
    }
    
  onSlide(e) {
    console.log(e.target.value)
  }
  
  onChange(e) {
    console.log(e.target.value)
  }
}
