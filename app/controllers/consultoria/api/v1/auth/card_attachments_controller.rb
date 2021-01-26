module Consultoria
module Api
  module V1
    module Auth
      class CardAttachmentsController < AuthController
        def create
          card.images.attach params[:files]
          render json: serializer_resource(card), status: :created
        end
        
        def destroy
          attachment.purge
          head :no_content
        end

        private

        def card
          @card ||= Card.find params[:card_id]
        end
        
        def attachment
          @attachment ||= ActiveStorage::Attachment.find params[:attachment_id]
        end

        def serializer_resource(card)
          CardSerializer.new(card, card_attachments)
        end

        def card_attachments
          @links_array = {}
          
          card.images.each do |image|
            @links_array["#{image.id}"] = rails_blob_url(image, only_path: true)
          end
          
          options = {}
          options[:links] = @links_array
          @card_attachments ||= options[:links]
        end
      end
    end
  end
end
end