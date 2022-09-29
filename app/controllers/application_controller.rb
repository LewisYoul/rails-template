class ApplicationController < ActionController::Base
  include SessionsHelper

  helper_method :current_user

  def authenticate_user
    return if current_user

    if request.format.json?
      return render json: { message: :unauthorized }, status: :unauthorized
    else
      return redirect_to unauthenticated_root_path 
    end
  end
end
