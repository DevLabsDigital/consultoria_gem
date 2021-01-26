# frozen_string_literal: true

module Comments
  class CommentRepliesCreateBusiness
    attr_accessor :reply
    attr_reader :reply

    def initialize(comment_params, user)
      @comment_params = comment_params
      @comment = Saddlebag::Comment.find_by(id: comment_params[:id])
      @card = Saddlebag::Card.find_by(id: comment_params[:card_id])
      @user = user
      @reply = Saddlebag::Comment.new
    end

    def save!
      reply_comment!
    end

    private

    attr_reader :comment_params, :comment, :card

    def reply_comment!
      reply.description = comment_params[:description]
      reply.user_id = @user.id
      reply.saddlebag_comment_id = comment.id
      reply.saddlebag_card_id = card.id
      reply.save!
      create_card_history reply
    end

    def create_card_history reply
      CardHistoryService::CardHistoryCreate.new(reply.card, @user, (description_history(reply)), "reply").call
    end

    def description_history reply
      "O usuário #{@user.name} respondeu o comentário #{reply.comment.description} com #{reply.description}"
    end
  end
end
