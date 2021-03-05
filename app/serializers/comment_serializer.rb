class CommentSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :description, :replies, :created_at

  attribute :user do |object| 
    JSON.parse(UserSerializer.new(object.user).serialized_json)
  end
end
