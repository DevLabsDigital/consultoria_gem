# frozen_string_literal: true

module Cards
  class CardMoveToListBusiness

    attr_reader :moved_card

    def initialize(params, user)
      @moved_card = Consultoria::Card.find_by(id: params[:id].to_i)
      if params[:list_label]
        @list = @moved_card.list.board.lists.where(status: Consultoria::List.statuses[params[:list_label].downcase]).first
        @consultoria_list_id = @list.id
      else
        @consultoria_list_id = params[:consultoria_list_id].to_i
      end
      
      @position = params[:position].to_i
    end

    def move_card!
      update_card_list!
    end

    private

    attr_reader :consultoria_list_id, :position

    def update_card_list!
      @moved_card.consultoria_list_id = consultoria_list_id
      @moved_card.position = position
      #@moved_card.user = @user
      @moved_card.save!
    end
    
  end
end
