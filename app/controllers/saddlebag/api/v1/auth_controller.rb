module Saddlebag
  module Api
    module V1
      class AuthController < ActionController::Base
         skip_before_action :verify_authenticity_token
        # include DeviseTokenAuth::Concerns::SetUserByToken
        # before_action :authenticate_user!
        # before_action :configure_permitted_parameters, if: :devise_controller?

        protected

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
        end
      end
    end
  end
end