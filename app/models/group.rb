class Group < ApplicationRecord
  attr_accessor :description #temp

  belongs_to :user
  has_many :activity_groups
end