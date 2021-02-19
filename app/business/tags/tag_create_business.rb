# frozen_string_literal: true

module Tags
  class TagCreateBusiness

    attr_reader :tag

    def initialize(tag_params)
      @tag_params = tag_params
      @tag = Consultoria::Tag.find_or_initialize_by(tag_params)
    end

    def save!
      create_tag!
    end

    private

    attr_reader :tag_params

    def create_tag!
      tag.assign_attributes tag_params
      tag.save!
    end
  end
end
