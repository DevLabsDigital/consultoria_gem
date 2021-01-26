module Saddlebag
module Api
  module V1
    module Auth
      class TasksController < AuthController

        def index
          render json: serializer_resource, status: :created
        end

        def create
          business = ::Tasks::TaskCreateBusiness.new(task_custom_params, current_user)
          business.save!
          render json: serializer_resource, status: :created
        end

        def update
          business = ::Tasks::TaskUpdateBusiness.new(task_custom_params, current_user)
          business.update!
          render json: serializer_resource, status: :created
        end

        def destroy
          checklist.destroy!
          head :no_content
        end

        private

        delegate :description, :saddlebag_checklist_id, to: :build_generic_class

        def task_custom_params
          {
            id: task_params[:id],
            description: task_params[:description],
            saddlebag_checklist_id: task_params[:saddlebag_checklist_id]
          }
        end

        def task_params
          params.permit(:id, :saddlebag_checklist_id, :description)
        end

        def serializer_resource
          options = {}
          #options[:include] = %i[tasks tasks.description]
          ChecklistSerializer.new checklist, options
        end

        def checklist
          @checklist ||= Checklist.find params[:saddlebag_checklist_id]
        end
      end
    end
  end
end
end