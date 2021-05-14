# frozen_string_literal: true

module Cards
    class CardUpdateBusiness
      attr_accessor :card_params, :user
      attr_reader :card
  
      def initialize(options, user)
        @card_params = options
        @card = Consultoria::Card.find(options[:id])
        @user = user
      end
  
      def update!
        ActiveRecord::Base.transaction do
          update_card!
        end
      end
  
      private
  
      attr_reader :card_params
  
      def update_card!
        debugger
        card.assign_attributes(card_params)
        if card.changes.any?
          create_card_history(card, user)
        end
        card.save!
      end

      def create_card_history(card, user)
        business = Cards::CardHistoryBusiness.new(card, user)
        business.call
      end
  
    end
  end
  