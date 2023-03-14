class Team < ApplicationRecord
  has_many :team_users
  has_many :users, through: :teams
end