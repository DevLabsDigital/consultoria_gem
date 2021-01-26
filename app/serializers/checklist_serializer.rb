class ChecklistSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :tasks

  
  
end
