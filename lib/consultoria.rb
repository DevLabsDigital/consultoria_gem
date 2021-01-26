require "consultoria/engine"

module Consultoria
  class << self
    def webpacker
      @webpacker ||= ::Webpacker::Instance.new(
        root_path: Consultoria::Engine.root,
        config_path: Consultoria::Engine.root.join('config', 'webpacker.yml')
      )
    end
  end
end
