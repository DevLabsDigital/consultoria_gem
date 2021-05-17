module Consultoria
module Api
  module V1
    module Auth
      class ChecklistsController < AuthController
        def create
          check = Checklist.new(checklist_params)
          check.save!
          text = "O usuário #{current_user.name} adicionou o checklist #{check.title}"
          CardHistoryService::CardHistoryCreate.new(check.card, current_user, text, "checklist").call
          render json: serializer_resource(check), status: :created
        end

        def update
          check = Checklist.find(params[:id])
          check.update(checklist_params)
          text = "O usuário #{current_user.name} alterou o checklist #{check.title}"
          CardHistoryService::CardHistoryCreate.new(check.card, current_user, text, "checklist").call
          render json: serializer_resource(check), status: :created
        end

        def destroy
          checklist.destroy!
          head :no_content
        end

        private

        def checklist_params
          params.permit(:consultoria_card_id, :title)
        end

        def checklist
          @checklist ||= Checklist.find_by(id: params[:id])
        end

        def serializer_resource(check)
          ChecklistSerializer.new check
        end
      end
    end
  end
end
end