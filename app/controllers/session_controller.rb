class SessionController < ApplicationController
  def destroy
    session[:user_id] = nil

    redirect_to unauthenticated_root_path
  end
end
