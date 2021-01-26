module Consultoria
module Api
  module V1
    module Auth
      class ListsController < AuthController
        def index
          @lists = List.where(consultoria_board_id: list_params[:consultoria_board_id])
          render json: serializer_resource(@lists), status: :ok
        end

        private

        def list_params
          params.permit(:consultoria_board_id)
        end
        
        def serializer_resource(lists)
          ListSerializer.new(lists)
        end
      end
    end
    
  end
end
end