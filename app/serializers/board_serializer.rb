class BoardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :lists, :protocols
  
  attribute :lists do |object, params|
    object.lists.map { |l| {id: l.id, status: l.status, cards: serialize(cards(l, params))
    }}
  end

  def self.serialize(cards)
    JSON.parse(CardSerializer.new(cards).serialized_json)
  end

  def self.comments(card)
    JSON.parse(CommentSerializer.new(card.comments).serialized_json)
  end

  def self.users(card)
    JSON.parse(UserSerializer.new(card.users).serialized_json)
  end

  def self.cards(list, params)
    unless params.empty?
      if params[:options][:tag_ids]
        list
        .cards
        .joins(:taggings)
        .includes(:tags, :taggings)
        .where('taggings.tag_id IN (?)', params[:options][:tag_ids])
      elsif params[:options][:user_ids]
        list
        .cards
        .joins(:users)
        .includes(:users, :user_cards)
        .where('user_cards.user_id IN (?)', params[:options][:user_ids])
      elsif params[:options][:context]
        list
        .cards
        .where('cards.title ilike (?)', "%#{params[:options][:context]}%")
      end
    else
      list
      .cards
    end
  end

  attribute :protocols do |object|
    JSON.parse(ProtocolSerializer.new(object.protocols).serialized_json)
  end
  
end
