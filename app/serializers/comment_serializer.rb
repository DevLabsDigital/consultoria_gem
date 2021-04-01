class CommentSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :description, :created_at

  attribute :replies do |object|
    JSON.parse(CommentSerializer.new(object.replies).serialized_json)
  end

  attribute :user do |object| 
    JSON.parse(UserSerializer.new(object.user).serialized_json)
  end
end
