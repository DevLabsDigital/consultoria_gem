# frozen_string_literal: true

module Tasks
  class TaskUpdateBusiness

    attr_accessor :task
    attr_reader :task

    def initialize(options, user)
      @task = Consultoria::Task.find_by(id: options[:id])
      @description = options.fetch(:description)
      @user = user
    end

    def update!
      update_task!
    end

    private

    attr_reader :description, :task

    def update_task!
      create_card_history task
      task.update(description: @description)
    end

    def create_card_history task
      CardHistoryService::CardHistoryCreate.new(task.checklist.card, @user, (description_history(task)), "task").call
    end

    def description_history task
      "O usuário #{@user.name} alterou a tarefa #{task.description} para #{@description}"
    end
  end
end
