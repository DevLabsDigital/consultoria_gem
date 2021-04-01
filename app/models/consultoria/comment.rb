module Consultoria
class Comment < ApplicationRecord
  belongs_to :card, foreign_key: 'consultoria_card_id'
  belongs_to :user
  belongs_to :comment, :class_name => "Comment", optional: true, foreign_key: 'consultoria_comment_id'
  has_many :replies, :class_name => 'Comment', :foreign_key => 'consultoria_comment_id'
  scope :no_replies, ->(){where(consultoria_comment_id: nil)}
end
end