// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"
import FilterableListController from "./filterable_list_controller"
import FiltersController from "./filters_controller"
import MapController from "./map_controller"
import PopoverController from "./popover_controller"
import RangeSliderController from "./range_slider_controller"
import CarouselController from "./carousel_controller"
import LazyModalController from "./lazy_modal_controller"

application.register("filterableList", FilterableListController)
application.register("filters", FiltersController)
application.register("map", MapController)
application.register("popover", PopoverController)
application.register("rangeSlider", RangeSliderController)
application.register("carousel", CarouselController)
application.register("lazyModal", LazyModalController)
