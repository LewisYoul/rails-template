class SubscriptionsController < ApplicationController
  before_action :authenticate_user

  def update
    subscription = current_user.subscription
    new_cancel_at_period_end = !subscription.cancel_at_period_end

    Stripe::Subscription.update(
      subscription.stripe_subscription_id,
      cancel_at_period_end: new_cancel_at_period_end
    )

    subscription.update!(cancel_at_period_end: new_cancel_at_period_end)

    redirect_to account_index_path
  end
end