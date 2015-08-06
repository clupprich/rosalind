
source 'https://rubygems.org'

# Rails 5.0.0.alpha
gem 'rails', github: 'rails/rails'

# Sockets
gem 'actioncable', github: 'rails/actioncable'
gem 'passenger'
gem 'passenger-rails'

# DB
gem 'pg'
gem 'arel', github: 'rails/arel'
gem 'paper_trail'
gem 'mdb'

# Layout
gem 'sass-rails', '~> 5.0'
gem 'sprockets-rails', github: 'rails/sprockets-rails'
gem 'bootstrap-sass'
gem 'jquery-rails'
gem 'formtastic-bootstrap'

# JS
gem 'node', platforms: :ruby
gem 'coffee-rails', github: 'rails/coffee-rails'
gem 'turbolinks', github: 'rails/turbolinks'
gem 'uglifier', '>= 1.3.0'
gem 'gon'

# i18n
gem 'gettext_i18n_rails'

gem 'jbuilder', '~> 2.0'
gem 'bcrypt', '~> 3.1.7'

group :development, :test do
  gem 'byebug'
  gem 'gettext'
  gem 'ruby_parser'
  gem 'quiet_assets'
end

group :test do
  gem 'rspec'
  gem 'cucumber-rails', require: false
  gem 'fakeredis', github: 'carsonreinke/fakeredis', branch: 'pubsub'
  gem 'capybara-webkit'
  gem 'capybara-screenshot'
  gem 'factory_girl'
  gem 'database_cleaner'
  gem 'timecop'
  gem 'chronic'
end

group :development do
  gem 'foreman'
  gem 'web-console', github: 'rails/web-console'
  gem 'spring'
end
