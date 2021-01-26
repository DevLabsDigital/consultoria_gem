# frozen_string_literal: true

module Comments
  class CommentCreateBusiness

    attr_reader :comment

    def initialize(comment_params, user)
      @comment_params = comment_params
      @comment = Consultoria::Comment.new
      @user = user
    end

    def save!
      create_comment!
    end

    private

    attr_reader :comment_params

    def create_comment!
      comment.assign_attributes comment_params
      comment.user_id = @user.id
      comment.save!
      create_card_history comment
    end

    def create_card_history comment
      CardHistoryService::CardHistoryCreate.new(comment.card, @user, (description_history(comment)), "comment").call
    end

    def description_history comment
      "O usuário #{@user.name} comentou #{comment.description}"
    end

  end
end
