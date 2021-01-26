class CommentSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :description, :replies

  attribute :user do |object| 
    JSON.parse(UserSerializer.new(object.user).serialized_json)
  end
end
