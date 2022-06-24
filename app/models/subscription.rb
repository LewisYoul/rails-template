class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :plan

  def paid?
    plan.paid?
  end
end
