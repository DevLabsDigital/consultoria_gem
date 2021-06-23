module Consultoria
	class Board < ApplicationRecord
	  has_many :lists, dependent: :destroy, foreign_key: 'consultoria_board_id'
	  has_many :cards, through: :lists
	  has_many :tags, dependent: :destroy, foreign_key: 'consultoria_board_id'
	  has_many :protocols, foreign_key: 'consultoria_board_id'
	  acts_as_paranoid
      


	  def duplicate
		cloned = self.deep_clone include: [:protocols, :tags, { 
			lists: [cards: [
				:checklists,
				:comments,
				:user_cards,
				:users,
				:tags
			]
		] } ], use_dictionary: true

		cloned.title = "#{self.title} clone" 
	    cloned.save
		Tagging.clear_duplications
		cloned.move_cards_to_begin
	  end

	  def move_cards_to_begin
		first_list = self.lists.where(status: "scheduled").first
		self.cards.update_all(consultoria_list_id: first_list.id)
	  end
	end
end