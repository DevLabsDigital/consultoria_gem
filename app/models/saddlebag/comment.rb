module Saddlebag
class Comment < ApplicationRecord
  belongs_to :card, foreign_key: 'saddlebag_card_id'
  belongs_to :user
  belongs_to :comment, :class_name => "Comment", optional: true, foreign_key: 'saddlebag_comment_id'
  has_many :replies, :class_name => 'Comment', :foreign_key => 'saddlebag_comment_id'
end
end