module ActivityGroupsHelper
  def create_activity_group_button(group, activity)
    activity_id = activity.is_a?(String) || activity.is_a?(Integer) ? activity : activity.id

    button_to({ controller: :activity_groups, action: :create, group_id: group.id, activity_id: activity_id }, { class: 'border border-md rounded-md py-4 px-3 w-full hover:bg-gray-100' }) do
      content_tag(:div, class: 'flex justify-between') do
        span = content_tag(:span) { group.name }

        span + raw(
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>'
        )
      end
    end
  end

  def destroy_activity_group_button(activity_group)
    button_to(activity_group_path(activity_group), { method: :delete, class: 'border border-md rounded-md py-4 px-3 w-full bg-purple-500 text-white' }) do
      content_tag(:div, class: 'flex justify-between') do
        span = content_tag(:span) { activity_group.group.name }

        span + raw(
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>'
        )
      end
    end
  end
end
