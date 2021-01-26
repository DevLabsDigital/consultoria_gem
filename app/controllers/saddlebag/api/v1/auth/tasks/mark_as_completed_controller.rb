module Saddlebag
module Api
  module V1
    module Auth
      module Tasks
        class MarkAsCompletedController < AuthController
          def update
            task.update(completed: params[:completed])
            text = "O usuário #{current_user.name} marcou a tarefa #{task.description} como completa"
            CardHistoryService::CardHistoryCreate.new(task.checklist.card, current_user, text, "task").call
            render json: serializer_resource, status: :created
          end

          private

          def task
            @task ||= Task.find params[:saddlebag_task_id]
          end

          def mark_as_completed_params
            params.permit(:completed, :saddlebag_task_id)
          end

          def serializer_resource
            TaskSerializer.new task
          end
        end
      end
    end
  end
end
end