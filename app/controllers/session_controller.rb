class SessionController < ApplicationController
  def new
    # TODO: It should be possible to auto log in if the person is logged in to strava
    client = Strava::OAuth::Client.new(
      client_id: "57045",
      client_secret: "05a3f29d756923b9bec7648f41f5e3ff997ed60c"
    )

    redirect_url = client.authorize_url(
      redirect_uri: 'http://f8a5-2a00-23c4-6289-8601-c51-9cf7-3474-abe3.ngrok.io/oauth',
      approval_prompt: 'auto',
      response_type: 'code',
      scope: 'activity:read',
    )

    redirect_to redirect_url, allow_other_host: true
  end

  def destroy
    session[:user_id] = nil

    redirect_to unauthenticated_root_path
  end
end
