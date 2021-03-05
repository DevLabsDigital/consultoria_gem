class CardSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :status, :list, :description, :position, :start_date, :finish_date, :date_conclusion, :tags, :checklists, :users, :lead, :images, :card_histories

  attribute :comments do |object|
    JSON.parse(CommentSerializer.new(object.comments).serialized_json)
  end  

  attribute :users do |object| 
    JSON.parse(UserSerializer.new(object.users).serialized_json)
  end

  attribute :checklists do |object| 
    object.checklists.map { |c| {id: c.id, title: c.title, tasks: c.tasks.map { |t| {id: t.id, description: t.description, completed: t.completed } }}}
  end

  attribute :lead do |object| 
    user = object.user_cards.where(lead: true).first.try(:user)
    JSON.parse(UserSerializer.new(user).serialized_json)
  end

  attribute :images do |object| 
    object.images.map do |image|
      {
        id: image.id,
        path: Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
      }
    end
  end

  attribute :card_histories do |object| 
    JSON.parse(CardHistorySerializer.new(object.card_histories).serialized_json)
  end
end
