module Consultoria
module Api
  module V1
    module Auth
      class TaggingsController < AuthController
      
        def create
          business = Tags::TaggingBusiness.new(tagging_params, current_user)
          business.save!
          render json: serializer_resource(business.tagging), status: :created
        end

        def destroy
          tagging.destroy!
          head :no_content
        end

        private
      
        def tagging_params
          params.permit(:consultoria_card_id, :consultoria_tag_id)
        end
        
        def serializer_resource(taggings)
          TaggingSerializer.new(taggings)
        end
      
        def tagging
          @tagging ||= Tagging.find_by(consultoria_tag_id: params[:consultoria_tag_id], consultoria_card_id: params[:consultoria_card_id])
        end
      end
      
    end
  end
end
end