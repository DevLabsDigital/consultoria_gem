module Consultoria
  class User < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    self.table_name = "users"
    #devise :database_authenticatable
    #include DeviseTokenAuth::Concerns::User
    has_one_attached :avatar
    has_many :comments
    has_many :user_cards, dependent: :destroy
    has_many :cards, through: :user_cards
    has_many :card_histories
    has_many :protocols

    
  end
end