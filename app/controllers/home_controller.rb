class HomeController < ApplicationController
  def index
    redirect_to authenticated_root_path if current_user
  end
end
