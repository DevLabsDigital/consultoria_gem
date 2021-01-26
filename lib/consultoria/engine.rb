module Consultoria
  class Engine < ::Rails::Engine
    isolate_namespace Consultoria

    # use packs from consultoria via Rack static
    # file service, to enable webpacker to find them
    # when running in the host application
    config.app_middleware.use(
      Rack::Static,
      # note! this varies from the webpacker/engine documentation
      urls: ["/consultoria-packs"], root: Consultoria::Engine.root.join("public")
    )


    

    initializer "webpacker.proxy" do |app|
      insert_middleware = begin
        Consultoria.webpacker.config.dev_server.present?
      rescue
        nil
      end
      next unless insert_middleware

      app.middleware.insert_before(
        0, Webpacker::DevServerProxy, # "Webpacker::DevServerProxy" if Rails version < 5
        ssl_verify_none: true,
        webpacker: Consultoria.webpacker
      )
    end

    config.autoload_paths << "#{config.root}/app/business"

    initializer :append_migrations do |app|
      unless app.root.to_s.match root.to_s
        config.paths["db/migrate"].expanded.each do |expanded_path|
          app.config.paths["db/migrate"] << expanded_path
        end
      end
    end
  end
end
