class User < ApplicationRecord
  has_one :token
  has_one :subscription
  has_one :plan, through: :subscription
  has_many :activities
  has_many :plan_limited_activities, -> (user) do
    return with_geometry.chronological if user.plan.paid?

    user.activities.where(id: user.activities.with_geometry.chronological.limit(user.plan.activities_limit).select(:id)).chronological
  end, class_name: 'Activity'

  accepts_nested_attributes_for :token
  accepts_nested_attributes_for :subscription

  validates_uniqueness_of :strava_id

  def full_name
    "#{first_name} #{last_name}"
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end
end
