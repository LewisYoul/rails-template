class ActivitiesController < ApplicationController
  before_action :authenticate_user
  
  def index
    respond_to do |format|
      format.json do
        render json: current_user.activities.with_geometry
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        activity = current_user.activities.find_by(id: params[:id])

        if !activity.fetched?
          client = Strava::Api::Client.new(access_token: current_user.access_token)

          photos = client.activity_photos(activity.strava_id)

          Activity.transaction do
            photos.each do |photo|
              activity.photos.create!(
                unique_id: photo.unique_id,
                default_photo: photo.default_photo,
                url: photo.urls['0']
              )
            end

            activity.update!(fetched: true)
          end
        end

        render json: activity.attributes.merge(photos: activity.photos)
      end
    end
  end
end
