# frozen_string_literal: true

module Tasks
  class TaskCreateBusiness

    attr_reader :task

    def initialize(options, user)
      @description = options.fetch(:description)
      @consultoria_checklist_id = options.fetch(:consultoria_checklist_id)
      @user = user
      @task = Consultoria::Task.new
    end

    def save!
      create_task!
    end

    private

    attr_reader :description, :consultoria_checklist_id

    def create_task!
      task.description = description
      task.consultoria_checklist_id = consultoria_checklist_id
      task.save!
      create_card_history task
    end

    def create_card_history task
      CardHistoryService::CardHistoryCreate.new(task.checklist.card, @user, (description_history(task)), "task").call
    end

    def description_history task
      "O usuário #{@user.name} adicionou a tarefa #{task.description}"
    end
  end
end
