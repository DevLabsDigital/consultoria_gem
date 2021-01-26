$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "saddlebag/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "saddlebag"
  spec.version     = Saddlebag::VERSION
  spec.authors     = ["Ben Vandgrift"]
  spec.email       = ["ben@vandgrift.com"]
  spec.homepage    = "https://github.com/bvandgrift/saddlebag"
  spec.summary     = "a saddlebag for your webpackmule"
  spec.description = "a saddlebag for your webpackmule"
  spec.license     = "MIT"

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 5.2.3", ">= 5.2.3"
  spec.add_dependency "webpacker", "~> 4.2.0"
  spec.add_dependency "react-rails", "2.6.0"
  spec.add_dependency "paper_trail", "11.1.0"
end
