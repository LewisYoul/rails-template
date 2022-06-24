class AccountController < ApplicationController
  before_action :authenticate_user

  def index
    @pro_plan = Plan.find_by(level: 'pro')
    @subscription_presenter = SubscriptionPresenter.new(current_user.subscription)
  end
end
