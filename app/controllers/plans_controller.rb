class PlansController < ApplicationController
  before_action :authenticate_user

  def upgrade
    @plan = Plan.find(params[:id])

    session = Stripe::Checkout::Session.create(
      success_url: 'https://f8a5-2a00-23c4-6289-8601-c51-9cf7-3474-abe3.ngrok.io/plans/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://f8a5-2a00-23c4-6289-8601-c51-9cf7-3474-abe3.ngrok.io/account',
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