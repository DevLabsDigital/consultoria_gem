class ListSerializer < ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :status, :cards

  attribute :cards do |object, params|
    list = Saddlebag::List.find_by(id: object.id)
    JSON.parse(CardSerializer.new(cards(list, params)).serialized_json)
  end

  def self.cards(list, params)
    unless params.empty?
      if params[:options][:tag_ids]
        list
        .cards
        .joins(:taggings)
        .includes(:tags, :taggings)
        .where('saddlebag_taggings.saddlebag_tag_id IN (?)', params[:options][:tag_ids])
      elsif params[:options][:user_ids]
        list
        .cards
        .joins(:users)
        .includes(:users, :user_cards)
        .where('saddlebag_user_cards.user_id IN (?)', params[:options][:user_ids])
      elsif params[:options][:context]
        list
        .cards
        .where('saddlebag_cards.title ilike (?)', "%#{params[:options][:context]}%")
      end
    else
      list
      .cards
    end
  end

end
