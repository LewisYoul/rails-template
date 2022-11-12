class AddPolylineToActivities < ActiveRecord::Migration[7.0]
  def change
    add_column :activities, :polyline, :string
  end
end
