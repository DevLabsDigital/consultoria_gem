module Saddlebag
module Api
  module V1
    module Auth
      module Boards
        class ProtocolsController < AuthController
          def index
            render json: serializer_resource(board.protocols), status: :ok
          end

          def create
            protocol = board.protocols.new protocols_params
            protocol.save!
            render json: serializer_resource(protocol), status: :created
          end

          def board
            @board ||= Board.find_by(id: params[:board_id])
          end

          private

          def serializer_resource(protocol)
            ProtocolSerializer.new protocol
          end

          def protocols_params
            params.permit(
              :meeting_date,
              :meeting_time,
              :meeting_place,
              :user_id,
              :meeting_goal,
              :description
            )
          end
        end
      end
    end
  end
end
end