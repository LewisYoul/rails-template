class User < ApplicationRecord
  has_one :subscription
  has_many :activities
  has_many :plan_limited_activities, -> (user) { with_geometry.chronological.limit(user.subscription.activities_limit) }, class_name: 'Activity'

  accepts_nested_attributes_for :subscription

  validates_uniqueness_of :strava_id

  def full_name
    "#{first_name} #{last_name}"
  end
end
