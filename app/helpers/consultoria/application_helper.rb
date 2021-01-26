require "webpacker/helper"

module Consultoria
  module ApplicationHelper
    include ::Webpacker::Helper

    def current_webpacker_instance
      Consultoria.webpacker
    end
  end
end