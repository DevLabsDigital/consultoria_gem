# frozen_string_literal: true

module BoardsServices
  class BoardCreateBusiness

    attr_reader :board

    def initialize(options)
      @title = options.fetch(:title)
      @board = Saddlebag::Board.new
    end

    def save!
      ActiveRecord::Base.transaction do
        create_board!
        create_lists_relationship_board!
      end
    end

    private

    attr_reader :title

    def create_board!
      board.title = title
      board.save!
    end

    def create_lists_relationship_board!
      lists_enums_status.each do |current_status|
        Saddlebag::List.create!(status: current_status, board: board)
      end
    end

    def lists_enums_status
      %i[scheduled delayed in_progress completed]
    end
  end
end
