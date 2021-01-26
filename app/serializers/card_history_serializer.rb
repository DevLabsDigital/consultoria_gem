class CardHistorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :user, :kind, :alteration

  attribute :user do |object|
   	JSON.parse(UserSerializer.new(object.user).serialized_json) 
   end
end
