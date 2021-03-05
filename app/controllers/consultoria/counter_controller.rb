require_dependency "consultoria/application_controller"

module Consultoria
  class CounterController < ApplicationController
    def index
      user = Consultoria::User.find_by_id(current_user.id)
      @props = {current_user: JSON.parse(UserSerializer.new(user).serialized_json)}
    end
  end
end
