class ActivitiesController < ApplicationController
  before_action :authenticate_user
  
  def index
    respond_to do |format|
      format.json do
        puts request.format.json?
        render json: Activity.all
      end
    end
  end
end
