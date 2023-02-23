class ActivityGroup < ApplicationRecord
  belongs_to :group
  belongs_to :activity

  validates_uniqueness_of :group_id, scope: :activity_id
end