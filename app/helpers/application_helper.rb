module ApplicationHelper
  def navbar_link_to(text, path)
    classes = if current_page?(path)
      "border-purple-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
    else
      "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    end

    current_page?(path) ? content_tag(:span, text, class: classes) : link_to(text, path, class: classes)
  end

  def seconds_in_words(time_in_seconds)
    hours = time_in_seconds / 3600

    if hours.zero?
      minutes = time_in_seconds / 60
      seconds = (time_in_seconds % 60)

      "#{minutes}m #{seconds}s"
    else
      minutes = (time_in_seconds % 3600) / 60

      return "#{hours} h" if minutes.zero?

      "#{hours}h #{minutes}m"
    end
  end

  def primary_button(text, opts = {})
    button_opts = {
      class: "bg-purple-500 hover:bg-purple-300 text-white px-4 py-1.5 border rounded-md"
    }.merge(opts)

    button_tag(text, button_opts)
  end

  def tertiary_button(text, opts = {})
    button_opts = {
      class: "bg-white hover:bg-gray-100 px-4 py-1.5 border rounded-md"
    }.merge(opts)

    button_tag(text, button_opts)
  end

  def cancel_button(text, opts = {})
    button_opts = {
      class: "bg-gray-200 hover:bg-gray-300 px-4 py-1.5 border rounded-md"
    }.merge(opts)

    button_tag(text, button_opts)
  end
end
