class StravaClient
  EXPIRY_TIME_WITH_BUFFER = Time.now.utc - 5.minutes

  def initialize(user)
    @user = user
  end

  def athlete_activities(*args)
    with_token_refresh { client.athlete_activities(*args) }
  end

  def activity_photos(activity_strava_id)
    with_token_refresh { client.activity_photos(activity_strava_id) }
  end

  private

  def with_token_refresh
    if access_token_expired?
      oauth_client = Strava::OAuth::Client.new(
        client_id: "57045",
        client_secret: "05a3f29d756923b9bec7648f41f5e3ff997ed60c"
      )
    
      response = oauth_client.oauth_token(
        refresh_token: @user.token.refresh_token,
        grant_type: 'refresh_token'
      )

      @user.token.update!(
        refresh_token: response.refresh_token,
        access_token: response.access_token,
        expires_at: response.expires_at
      )
    end

    yield
  end

  def access_token_expired?
    @user.token.expires_at < EXPIRY_TIME_WITH_BUFFER
  end

  # Don't memoize & reload user token to ensure access_token is always up to date
  def client
    Strava::Api::Client.new(access_token: @user.token.reload.access_token)
  end
end