class User < ApplicationRecord
  has_many :activities

  validates_uniqueness_of :strava_id
end
