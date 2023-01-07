import { Controller } from "@hotwired/stimulus"
import noUiSlider from 'nouislider';
import wNumb from "wnumb";

export default class extends Controller {
  static outlets = [ "filters" ]

  static targets = ['min', 'max']

  static values = {
    min: Number,
    max: Number
  }

  connect() {
    this.filterOutlet = this.filtersOutlets[0]

    const slider = document.getElementById('slider');

    noUiSlider.create(slider, {
      start: [this.minValue, this.maxValue],
        connect: true,
        range: {
          'min': this.minValue,
          'max': this.maxValue
        },
        step: 2,
        behaviour: 'tap-drag',
        format: wNumb({
          decimals: 0
        }),
      });

      slider.noUiSlider.on('slide', (values) => {
        const [min, max] = values
        
        this.minTarget.innerHTML = min
        this.maxTarget.innerHTML = Number(max) === this.maxValue ? `> ${max}` : max
      })
      
      slider.noUiSlider.on('change', (values) => {
        const [min, max] = values

        this.filterOutlet.updateFilters({ min_distance: min, max_distance: max })
      })
    }
    
  onSlide(e) {
    console.log(e.target.value)
  }
  
  onChange(e) {
    console.log(e.target.value)
  }
}
