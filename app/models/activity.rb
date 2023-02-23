class Activity < ApplicationRecord
  belongs_to :user
  has_many :photos
  has_many :activity_groups
  has_many :groups, through: :activity_groups

  scope :with_geometry, -> { where.not(summary_polyline: nil) }
  scope :chronological, -> { order(start_date: :desc) }
end
