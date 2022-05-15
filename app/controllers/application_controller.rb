class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user ||= session[:user_id] ? User.find(session[:user_id]) : nil
  end

  def authenticate_user
    return redirect_to unauthenticated_root_path unless current_user
  end
end
