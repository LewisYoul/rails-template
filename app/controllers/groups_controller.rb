class GroupsController < ApplicationController
  before_action :authenticate_user
  
  def index
    @groups = current_user.groups.includes(:activity_groups)
  end

  def create
    respond_to do |format|
      format.turbo_stream do
        @group = current_user.groups.create!(group_params)
        @activity = current_user.activities.find(params[:activity_id])
        @activity_group = @group.activity_groups.create!(activity: @activity)
        @groups = current_user.groups.includes(:activity_groups)
      end
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, :description)
  end
end