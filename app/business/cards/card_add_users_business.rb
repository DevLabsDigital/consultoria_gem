# frozen_string_literal: true

module Cards
  class CardAddUsersBusiness

    attr_reader :card, :current_user
    attr_accessor :card, :current_user

    def initialize(card_params, user)
      @card = Consultoria::Card.find card_params[:id]
      @users = Consultoria::User.where("id IN (?)", card_params[:user_ids])
      @is_main = card_params[:is_main]
      @current_user = user
    end

    def add_user_to_card!
      add_users! 
    end

    private

    def add_users!
      @users.each do |user|
        @user_card = Consultoria::UserCard.where("consultoria_card_id = ? AND user_id = ?", @card.id, user.id)
        if @user_card.count > 0
          @user_card_first = @user_card.first
          @user_card_first.is_main = @is_main
          @user_card_first.save
        else
          @user_card = Consultoria::UserCard.create!(consultoria_card_id: @card.id, user_id: user.id, is_main: @is_main)
          card_history(@card, user)
        end
      end
    end

    def card_history(card, user)
      Consultoria::CardHistory.create!({
        user_id: current_user.id,
        consultoria_card_id: card.id,
        kind: "user",
        alteration: "O Usuário #{current_user.name} adicionou o usuário #{user.name} "
      })
    end

  end
end
