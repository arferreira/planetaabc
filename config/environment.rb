# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Planetaabc::Application.initialize!
Time::DATE_FORMATS[:post] = "%b %m, %Y - %I:%M%p"