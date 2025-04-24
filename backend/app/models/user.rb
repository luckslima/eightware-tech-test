class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_one_attached :photo

  validates :name, presence: true, length: { maximum: 50 }
  validates :bio, length: { maximum: 300 }
end
