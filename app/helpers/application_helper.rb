module ApplicationHelper
  def navbar_link_to(text, path)
    classes = if current_page?(path)
      "border-purple-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
    else
      "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    end

    current_page?(path) ? content_tag(:span, text, class: classes) : link_to(text, path, class: classes)
  end
end
