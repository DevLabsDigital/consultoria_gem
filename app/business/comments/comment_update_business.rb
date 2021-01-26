# frozen_string_literal: true

module Comments
  class CommentUpdateBusiness
    attr_reader :comment

    def initialize(options)
      @description = options.fetch(:description)
      @comment = Saddlebag::Comment.find_by(id: options[:id])
    end

    def update!
      update_comment!
      @comment
    end

    private

    def update_comment!
      create_card_history(comment)
      comment.update(description: @description)
    end

    def create_card_history(comment)
      CardHistoryService::CardHistoryCreate.new(comment.card, comment.user, (description_history(comment)), "comment").call
    end

    def description_history comment
      "O usuário #{comment.user.name} alterou o comentário #{comment.description} para #{@description}"
    end

  end
end
