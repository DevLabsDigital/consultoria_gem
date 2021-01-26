module Consultoria
module Api
  module V1
    module Auth
      class TagsController < AuthController

        def index
          @tags = Tag.where(consultoria_board_id: tag_params[:consultoria_board_id])
          render json: serializer_resource(@tags), status: :ok
        end
      
        def create
          business = Tags::TagCreateBusiness.new(tag_params)
          business.save!
          render json: serializer_resource(business.tag), status: :created
        end
      
        def tag_params
          params.permit(:consultoria_board_id, :name)
        end
        
        def serializer_resource(tags)
          TagSerializer.new(tags)
        end
      
        def tag
          @card ||= Card.find params[:id]
        end
      end
      
    end
  end
end
end