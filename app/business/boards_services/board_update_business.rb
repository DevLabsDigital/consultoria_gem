# frozen_string_literal: true

module BoardsServices
    class BoardUpdateBusiness
  
      attr_reader :board
  
      def initialize(board, options)
        @title = options.fetch(:title)
        @board = Consultoria::Board.find(options[:id])
      end
  
      def update!
        ActiveRecord::Base.transaction do
          update_board!
        end
      end
  
      private
  
      attr_reader :title
  
      def update_board!
        board.update(title: title)
      end
  
    end
  end
  