class UserSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email, :name

   attribute :avatar do |object|
   	if object.avatar
   		Rails.application.routes.url_helpers.rails_blob_url(object.avatar, only_path: true) if object.avatar.attached?
   	else	
   		""
   	end
   
   end
end
