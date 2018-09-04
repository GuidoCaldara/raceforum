class Question < ApplicationRecord
    belongs_to :user
    belongs_to :race
    has_many :answers, dependent: :destroy
end
