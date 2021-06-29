class UserSerializer < ApplicationSerializer
	include FastJsonapi::ObjectSerializer
	attributes :email, :name, :id
	

	attribute :name do |object|
		object.user_profile.name.to_s.downcase.titleize
	end
	attribute :avatar do |object|
		profile = object.user_profile
		
		if profile && profile.picture && profile.picture != ""
			Rails.application.routes.url_helpers.rails_blob_url(profile.picture, only_path: true) if profile.picture.attached?
		else	
			""
		end
   end
end
