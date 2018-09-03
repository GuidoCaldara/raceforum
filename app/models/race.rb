class Race < ApplicationRecord
    belongs_to :user
    has_many :reviews, dependent: :destroy
    has_many :questions, dependent: :destroy
end
