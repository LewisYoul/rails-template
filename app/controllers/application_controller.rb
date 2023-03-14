class ApplicationController < ActionController::Base
  # include SessionsHelper

  # helper_method :current_user

  # def authenticate_user
  #   return if current_user

  #   if request.format.json?
  #     return render json: { message: :unauthorized }, status: :unauthorized
  #   else
  #     return redirect_to unauthenticated_root_path 
  #   end
  # end

  helper_method :current_team_user
  helper_method :current_team

  def set_current_team_user(team_user)
    session[:current_team_user_id] = team_user.id
  end

  def current_team_user
    @current_team_user ||= current_user.team_users.find(session[:current_team_user_id])
  end

  def current_team
    @current_team ||= current_user.teams.find(current_team_user.team_id)
  end
end
