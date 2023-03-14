class TeamUser < ApplicationRecord
  belongs_to :user
  belongs_to :team

  validates_uniqueness_of :user_id, scope: :team_id
end