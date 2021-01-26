module Saddlebag
module Api
  module V1
    module Auth
      class CommentsController < AuthController
        def create
          business = Comments::CommentCreateBusiness.new(comment_params, current_user)
          business.save!
          render json: serializer_resource(business.comment), status: :created
        end

        def update
          business = Comments::CommentUpdateBusiness.new(comment_params)
          business.update!
          render json: serializer_resource(business.comment), status: :ok
        end

        def replies
          business = Comments::CommentRepliesCreateBusiness.new(comment_params, current_user)
          business.save!
          render json: serializer_resource(business.reply), status: :created
        end

        def destroy
          comment.destroy!
          head :no_content
        end

        private

        def comment_params
          params.permit(:id, :saddlebag_card_id, :description)
        end

        def comment
          @comment ||= Comment.find_by(id: params[:id])
        end

        def serializer_resource(comment)
          CommentSerializer.new(comment)
        end

        def card
          @card ||= Comment.find_by(saddlebag_card_id: params[:saddlebag_card_id])
        end
      end
    end
  end
end
end