# frozen_string_literal: true

module Tags
  class TaggingBusiness

    attr_reader :tagging

    def initialize(tagging_params, user)
      @tagging_params = tagging_params
      @tagging = Saddlebag::Tagging.new
      @user = user
    end

    def save!
      create_tagging!
    end

    private

    attr_reader :tagging_params

    def create_tagging!
      tagging.assign_attributes tagging_params
      tagging.save!
      create_card_history tagging
    end

    def create_card_history tagging
      CardHistoryService::CardHistoryCreate.new(tagging.card, @user, (description_history(tagging)), "tag").call
    end

    def description_history tagging
      "O usuário #{@user.name} adicionou a categoria #{tagging.tag.name} ao card #{tagging.card.title}"
    end

  end
end
