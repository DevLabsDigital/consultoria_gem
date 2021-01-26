# frozen_string_literal: true

module Cards
  class CardAddUsersBusiness

    attr_reader :card, :current_user
    attr_accessor :card, :current_user

    def initialize(card_params, user)
      @card = Saddlebag::Card.find card_params[:id]
      @users = Saddlebag::User.where("id IN (?)", card_params[:user_ids])
      @current_user = user
    end

    def add_user_to_card!
      add_users! 
    end

    private

    def add_users!
      @users.each do |user|
        @user_card = Saddlebag::UserCard.where("saddlebag_card_id = ? AND user_id = ?", @card.id, user.id)
        if @user_card.count > 0
          @user_card
        else
          @user_card = Saddlebag::UserCard.create!(saddlebag_card_id: @card.id, user_id: user.id)
          card_history(@card, user)
        end
      end
    end

    def card_history(card, user)
      Saddlebag::CardHistory.create!({
        user_id: current_user.id,
        saddlebag_card_id: card.id,
        kind: "user",
        alteration: "O Usuário #{current_user.name} adicionou o usuário #{user.name} "
      })
    end

  end
end
