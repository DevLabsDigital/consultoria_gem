# frozen_string_literal: true

module Cards
  class CardCreateBusiness

    attr_reader :card

    def initialize(card_params, user)
      @card_params = card_params
      @card = Saddlebag::Card.new
      @user = user
    end

    def save!
      create_card!
    end

    private

    attr_reader :card_params
    delegate :status, to: :list, prefix: true

    def create_card!
      card.assign_attributes card_params
      card.status = list_status
      card.save!
    end

    def list
      @list ||= Saddlebag::List.find card_params['saddlebag_list_id']
    end
  end
end
