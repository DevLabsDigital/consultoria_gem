$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "consultoria/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "consultoria"
  spec.version     = Consultoria::VERSION
  spec.authors     = ["Ben-Hur"]
  spec.email       = ["benhur.onrails@gmail.com"]
  spec.homepage    = "https://github.com/bvandgrift/consultoria"
  spec.summary     = "a consultoria for your webpackmule"
  spec.description = "a consultoria for your webpackmule"
  spec.license     = "MIT"

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 5.2.4.5", ">= 5.2.4.5"
  spec.add_dependency "webpacker", "~> 4.2.0"
  spec.add_dependency "react-rails", "2.6.0"
  spec.add_dependency "paper_trail", "11.1.0"
end
