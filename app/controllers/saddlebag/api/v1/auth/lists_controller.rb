module Saddlebag
module Api
  module V1
    module Auth
      class ListsController < AuthController
        def index
          @lists = List.where(saddlebag_board_id: list_params[:saddlebag_board_id])
          render json: serializer_resource(@lists), status: :ok
        end

        private

        def list_params
          params.permit(:saddlebag_board_id)
        end
        
        def serializer_resource(lists)
          ListSerializer.new(lists)
        end
      end
    end
    
  end
end
end