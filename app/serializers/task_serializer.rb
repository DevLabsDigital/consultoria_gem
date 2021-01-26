class TaskSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :completed, :position
end
