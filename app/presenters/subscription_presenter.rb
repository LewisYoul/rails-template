class SubscriptionPresenter
  def initialize(subscription)
    @subscription = subscription
  end

  def plan_level
    @subscription.plan.level.capitalize
  end

  def yearly_cost_dollars
    "$#{@subscription.plan.yearly_cost_dollars}"
  end

  def renews_on
    return '---' if @subscription.cancel_at_period_end || !@subscription.end_datetime

    @subscription.end_datetime.strftime('%D')
  end

  def expires_on
    @subscription.end_datetime.strftime('%D')
  end

  def renew_confirmation_text
    "Your subscription is currently due to expire on #{expires_on}. By clicking continue your subscription will be updated to renew on #{renews_on}. Do you want to continue?"
  end

  def cancel_confirmation_text
    "Your subscription is currently due to renew on #{renews_on}. By clicking continue your subscription will be updated to expire on #{expires_on}. Do you want to continue?"
  end
end