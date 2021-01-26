# frozen_string_literal: true

module Cards
  class CardHistoryBusiness
    attr_accessor :card, :user

    def initialize(card, user)
      @card = card
      @user = user
    end

    def call
      card_history
    end

    private

    attr_reader :card

    def card_history
      card.changes.to_a.each do |card_history|
        kind_parse = kind(card_history[0])
        Saddlebag::CardHistory.create!({
          user_id: user.id,
          saddlebag_card_id: card.id,
          kind: card_history[0],
          alteration: "O usuário #{user.name} alterou o #{kind_parse} de #{card_history[1][0]} para #{card_history[1][1]}"
        })
      end
    end

    def kind(card_history)
      case card_history
        when "title"
          "Título"
        when "start_date"
          "Data Inicial"
        when "finish_date"
          "Data Final"
        when "date_conclusion"
          "Data de Conclusão"
        when "status"
          "Status"
        when "description"
          "Descrição"
        end
    end

  end
end