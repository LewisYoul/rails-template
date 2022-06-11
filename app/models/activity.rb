class Activity < ApplicationRecord
  belongs_to :user
  has_many :photos

  scope :with_geometry, -> { where.not(summary_polyline: nil) }
  scope :chronological, -> { order(start_date: :desc) }
end
