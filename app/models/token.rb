class Token < ApplicationRecord
  belongs_to :user

  validates :refresh_token, presence: true
  validates :access_token, presence: true
  validates :expires_at, presence: true
end