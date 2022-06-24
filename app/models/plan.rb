class Plan < ApplicationRecord
  enum level: {
    free: 'free',
    pro: 'pro'
  }

  ACTIVITY_LIMITS = {
    'free' => 30,
    'pro' => nil
  }

  def paid?
    level != 'free'
  end

  def activities_limit
    ACTIVITY_LIMITS[level]
  end
end