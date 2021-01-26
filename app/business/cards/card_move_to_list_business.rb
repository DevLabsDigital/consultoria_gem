# frozen_string_literal: true

module Cards
  class CardMoveToListBusiness

    attr_reader :moved_card

    def initialize(params, user)
      @moved_card = Saddlebag::Card.find_by(id: params[:id].to_i)
      @saddlebag_list_id = params[:saddlebag_list_id].to_i
      @position = params[:position].to_i
    end

    def move_card!
      update_card_list!
    end

    private

    attr_reader :saddlebag_list_id, :position

    def update_card_list!
      @moved_card.saddlebag_list_id = saddlebag_list_id
      @moved_card.position = position
      #@moved_card.user = @user
      @moved_card.save!
    end
    
  end
end
