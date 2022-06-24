class OauthController < ApplicationController
  def index
    if params[:code]
      client = Strava::OAuth::Client.new(
        client_id: "57045",
        client_secret: "05a3f29d756923b9bec7648f41f5e3ff997ed60c"
      )

      response = client.oauth_token(code: params[:code])
      athlete = response['athlete']

      user = User.find_by(strava_id: athlete.id)

      if user
        user.update!(
          refresh_token: response.refresh_token,
          access_token: response.access_token,
          expires_at: response.expires_at
        )
      else
        user = User.create!(
          strava_id: athlete.id,
          first_name: athlete.firstname,
          last_name: athlete.lastname,
          refresh_token: response.refresh_token,
          access_token: response.access_token,
          expires_at: response.expires_at,
          subscription_attributes: {
            plan_id: Plan.find_by(level: 'free').id,
            status: 'active'
          }
        )

        client = Strava::Api::Client.new(access_token: user.access_token)
        
        client.athlete_activities(per_page: 100) do |activity|
          Activity.create!(
            user: user,
            name: activity.name,
            activity_type: activity.type,
            distance: activity.distance,
            moving_time: activity.moving_time,
            elapsed_time: activity.elapsed_time,
            total_elevation_gain: activity.total_elevation_gain,
            strava_id: activity.id,
            start_date: activity.start_date,
            start_date_local: activity.start_date_local,
            timezone: activity.timezone,
            utc_offset: activity.utc_offset,
            location_country: activity.location_country,
            achievement_count: activity.achievement_count,
            kudos_count: activity.kudos_count,
            comment_count: activity.comment_count,
            athlete_count: activity.athlete_count,
            photo_count: activity.photo_count,
            summary_polyline: activity.map.summary_polyline,
            visibility: activity.visibility,
            start_latlng: activity.start_latlng,
            end_latlng: activity.end_latlng,
            average_speed: activity.average_speed,
            max_speed: activity.max_speed,
            average_cadence: activity.average_cadence,
            has_heartrate: activity.has_heartrate,
            average_heartrate: activity.average_heartrate,
            max_heartrate: activity.max_heartrate,
            elev_high: activity.elev_high,
            elev_low: activity.elev_low,
            external_id: activity.external_id,
            total_photo_count: activity.total_photo_count
          )
        end
      end

      session[:user_id] = user.id

      redirect_to authenticated_root_path
    else
      redirect_to unauthenticated_root_path
    end
  end
end
