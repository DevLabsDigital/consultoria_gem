module Saddlebag
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
          params.permit(:saddlebag_card_id, :saddlebag_tag_id)
        end
        
        def serializer_resource(taggings)
          TaggingSerializer.new(taggings)
        end
      
        def tagging
          @tagging ||= Tagging.find_by(saddlebag_tag_id: params[:saddlebag_tag_id])
        end
      end
      
    end
  end
end
end