class PlansController < ApplicationController
  before_action :authenticate_user

  def upgrade
    @plan = Plan.find(params[:id])

    session = Stripe::Checkout::Session.create(
      success_url: 'https://7cd6-2a00-23c7-63a9-1c01-4da4-f287-d858-359.ngrok.io/plans/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://7cd6-2a00-23c7-63a9-1c01-4da4-f287-d858-359.ngrok.io/account',
      mode: 'subscription',
      metadata: { user_id: current_user.id, plan_id: @plan.id },
      line_items: [{ quantity: 1, price: @plan.stripe_price_id }]
    )

    redirect_to session.url, allow_other_host: true
  end

  def success
    return redirect_to(authenticated_root_path) unless params[:session_id]

    session = Stripe::Checkout::Session.retrieve(params[:session_id])

    puts "\n\n\n SUCCESS \n\n\n"

    StripeServices::CheckoutSessionCompleter.new(session).complete
  end
end