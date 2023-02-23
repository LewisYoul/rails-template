class ActivityGroupsController < ApplicationController
  before_action :authenticate_user

  def create
    respond_to do |format|
      format.turbo_stream do
        @group = current_user.groups.find(params[:group_id])
        @activity = current_user.activities.find(params[:activity_id])
        @activity_group = @group.activity_groups.create!(activity: @activity, group: @group)
      end
    end
  end

  def destroy
    respond_to do |format|
      format.turbo_stream do
        @activity_group = current_user.activity_groups.find(params[:id])
        @activity = @activity_group.activity
        @group = @activity_group.group
        @activity_group.destroy!
      end
    end
  end
end