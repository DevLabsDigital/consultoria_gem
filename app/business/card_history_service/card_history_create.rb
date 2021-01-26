# frozen_string_literal: true

module CardHistoryService
  class CardHistoryCreate
    attr_accessor :card, :user, :text, :kind

    def initialize(card, user, text, kind)
      @card = card
      @user = user
      @kind = kind
      @text = text
    end

    def call
      create_card_history
    end

    private

    def create_card_history
      @s = Saddlebag::CardHistory.new
      @s.user_id = user.id
      @s.saddlebag_card_id = card.id
      @s.kind = kind
      @s.alteration = text
      @s.save!
      
    end

  end
end
