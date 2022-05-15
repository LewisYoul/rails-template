class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :activity_type, null: false
      t.float :distance
      t.integer :moving_time
      t.integer :elapsed_time
      t.float :total_elevation_gain
      t.string :strava_id, null: false
      t.datetime :start_date, null: false
      t.datetime :start_date_local, null: false
      t.string :timezone, null: false
      t.float :utc_offset
      t.string :location_country
      t.integer :achievement_count
      t.integer :kudos_count
      t.integer :comment_count
      t.integer :athlete_count
      t.integer :photo_count
      t.string :summary_polyline
      t.string :visibility
      t.jsonb :start_latlng
      t.jsonb :end_latlng
      t.float :average_speed
      t.float :max_speed
      t.float :average_cadence
      t.boolean :has_heartrate
      t.float :average_heartrate
      t.float :max_heartrate
      t.float :elev_high
      t.float :elev_low
      t.string :external_id
      t.integer :total_photo_count

      t.timestamps
    end
  end
end
