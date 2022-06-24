class Subscription < ApplicationRecord
  belongs_to :user

  enum plan: {
    free: 'free',
    pro: 'pro'
  }

  ACTIVITY_LIMITS = {
    'free' => 30,
    'pro' => nil
  }

  def activities_limit
    ACTIVITY_LIMITS[plan]
  end
end
