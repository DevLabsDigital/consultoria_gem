module Saddlebag
  class Card < ApplicationRecord
    belongs_to :list, foreign_key: 'saddlebag_list_id'
    acts_as_list scope: :saddlebag_list_id, column: "saddlebag_list_id"

    has_paper_trail 
    
    has_many :checklists, dependent: :destroy, foreign_key: 'saddlebag_card_id'
    has_many :taggings, dependent: :destroy, foreign_key: 'saddlebag_card_id'
    has_many :tags, through: :taggings, foreign_key: 'saddlebag_card_id'
    has_many :comments, dependent: :destroy, foreign_key: 'saddlebag_card_id'
    has_many :user_cards, dependent: :destroy, foreign_key: 'saddlebag_card_id'
    has_many :users, through: :user_cards, foreign_key: 'saddlebag_card_id'
    has_many :card_histories, dependent: :destroy, foreign_key: 'saddlebag_card_id'

    has_many_attached :images

    def dup
      super.tap do |card|

        # duplicate checklists as well
        self.checklists.each { |checklist| card.checklists << checklist.dup }

        # duplicate tags as well
        self.tags.each { |tag| card.tags << tag.dup }

        # duplicate taggings as well
        self.taggings.each { |tagging| card.taggings << tagging.dup }

        # duplicate taggings as well
        self.comments.each { |comment| card.comments << comment.dup }
      end
    end

  end
end