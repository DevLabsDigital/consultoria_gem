class TaggingSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :card, :tag
end
