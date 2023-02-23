class Group < ApplicationRecord
  belongs_to :user
  has_many :activity_groups
end