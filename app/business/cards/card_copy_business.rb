# frozen_string_literal: true

module Cards
  class CardCopyBusiness

    attr_reader :copied_card

    def initialize(card_params)
      @card = Consultoria::Card.find card_params[:id]
      @title = card_params[:title]
      @list = card_params[:consultoria_list_id]
    end

    def copy_card!
      duplicate_card! 
    end

    private

    attr_reader :card

    def duplicate_card!
      @copied_card = @card.dup
      @copied_card.title = @title unless @title.blank?
      @copied_card.consultoria_list_id = @list unless @list.blank?
      @copied_card.save!
    end

  end
end
