module Consultoria
  class Card < ApplicationRecord
    belongs_to :list, foreign_key: 'consultoria_list_id'
    #acts_as_list scope: :consultoria_list_id, column: "consultoria_list_id"

    has_paper_trail 
    
    has_many :checklists, dependent: :destroy, foreign_key: 'consultoria_card_id'
    has_many :taggings, dependent: :destroy, foreign_key: 'consultoria_card_id'
    has_many :comments, dependent: :destroy, foreign_key: 'consultoria_card_id'
    has_many :card_histories, dependent: :destroy, foreign_key: 'consultoria_card_id'
    has_many :user_cards, dependent: :destroy, foreign_key: 'consultoria_card_id'
    
    has_and_belongs_to_many :tags, ->(card) { where("consultoria_tags.consultoria_board_id = ?", card.list.consultoria_board_id)},
                            foreign_key: 'consultoria_card_id', 
                            join_table: 'consultoria_taggings', 
                            association_foreign_key: "consultoria_tag_id"
    
    has_and_belongs_to_many :users, foreign_key: 'consultoria_card_id', 
                            join_table: 'consultoria_user_cards', 
                            association_foreign_key: "user_id"
                            
    

    has_many_attached :images

    def self.remove_dates
      self.update_all(finish_date: nil, start_date: nil, finish_date: nil, date_conclusion: nil)
    end

    def dup
      super.tap do |card|

        # duplicate checklists as well
        self.checklists.each { |checklist| card.checklists << checklist.dup }

        # duplicate tags as well
        self.tags.each { |tag| card.tags << tag }

        # duplicate taggings as well
        self.taggings.each { |tagging| card.taggings << tagging.dup }

        # duplicate taggings as well
        self.comments.each { |comment| card.comments << comment.dup }
      end
    end

  end
end