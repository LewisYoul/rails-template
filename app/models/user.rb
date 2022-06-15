class User < ApplicationRecord
  has_many :activities

  validates_uniqueness_of :strava_id

  def full_name
    "#{first_name} #{last_name}"
  end
end
