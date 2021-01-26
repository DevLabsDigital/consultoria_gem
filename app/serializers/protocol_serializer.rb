class ProtocolSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :meeting_date, :meeting_time, :meeting_place, :user, :meeting_goal, :description
end
