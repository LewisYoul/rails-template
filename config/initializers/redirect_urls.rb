def base_env_url
  return ENV["NGROK_URL"] if Rails.env.development?

  "morning-mesa-86231.herokuapp.com"
end