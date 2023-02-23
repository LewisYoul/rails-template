class GroupsController < ApplicationController
  before_action :authenticate_user
  
  def index
    @groups = current_user.groups.includes(:activity_groups)
  end
end