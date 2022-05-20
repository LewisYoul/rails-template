class Activity < ApplicationRecord
  belongs_to :user

  scope :with_geometry, -> { where.not(summary_polyline: nil) }
end
