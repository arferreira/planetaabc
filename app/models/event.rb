class Event < ActiveRecord::Base
  attr_accessible :category, :description, :end_date, :name, :start_date
end
