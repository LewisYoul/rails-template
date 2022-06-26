class User < ApplicationRecord
  has_one :token
  has_one :subscription
  has_one :plan, through: :subscription
  has_many :activities
  has_many :plan_limited_activities, -> (user) { with_geometry.chronological.limit(user.activities_limit) }, class_name: 'Activity'

  accepts_nested_attributes_for :token
  accepts_nested_attributes_for :subscription

  validates_uniqueness_of :strava_id

  def full_name
    "#{first_name} #{last_name}"
  end

  def activities_limit
    subscription.plan.activities_limit
  end
end
