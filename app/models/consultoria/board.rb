module Consultoria
	class Board < ApplicationRecord
	  has_many :lists, foreign_key: 'consultoria_board_id'
	  has_many :cards, through: :lists
	  has_many :tags, foreign_key: 'consultoria_board_id'
	  has_many :protocols, foreign_key: 'consultoria_board_id'
	  acts_as_paranoid
      


	  def duplicate
		cloned = self.deep_clone include: [:protocols, :tags, { 
			lists: [cards: [
				:user_cards,
				:users,
				:tags,
				checklists: [:tasks],
			]
		] } ], use_dictionary: true

		cloned.title = "#{self.title} clone" 
	    cloned.save
		cloned.cards.remove_dates
		Consultoria::Tagging.clear_duplications
		Consultoria::UserCard.clear_duplications
		cloned.move_cards_to_begin
	  end

	  def move_cards_to_begin
		first_list = self.lists.where(status: "scheduled").first
		self.cards.update_all(consultoria_list_id: first_list.id)
	  end

	  def percentages_by_list
		percentages = {}
		total = cards.count.to_f
		lists.each do |list|
			percentages[list.status] = ((list.cards.count.to_f / total) * 100).to_i
		end
		return percentages
	  end
	end
end