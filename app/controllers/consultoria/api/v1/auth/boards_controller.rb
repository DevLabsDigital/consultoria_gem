module Consultoria
module Api
  module V1
    module Auth
      class BoardsController < AuthController

        def index
          @board = Board.where(company_id: current_user.consultoria_company_id).all
          render json: serializer_resource(@board), status: :ok
        end

        def show
          render json: serializer_resource(board), status: :ok
        end

        def search_by
          board = Board.where(company_id: current_user.consultoria_company_id).find(params[:board_id])
          object = ListSerializer.new(board.lists, {params: {options: search_params}})
          render json: object, status: :ok
        end

        def create
          business = BoardsServices::BoardCreateBusiness.new(title: board_params[:title], company_id: current_user.consultoria_company_id)
          business.save!

          render json: serializer_resource(business.board), status: :created
        end


        def update
          business = BoardsServices::BoardUpdateBusiness.new(board, params)
          business.update!

          render json: serializer_resource(business.board), status: :ok
        end

        def destroy
          board.destroy!
          head :no_content
        end

        private

        def board_params
          params.permit(:title)
        end

        def search_params
          params.permit(:board_id, :context, tag_ids: [], user_ids: [])
        end

        def board
          @board ||= Board.where(company_id: current_user.consultoria_company_id).find params[:id]
        end

        def serializer_resource(board)
          BoardSerializer.new(board)
        end
      end
    end
  end
end
end