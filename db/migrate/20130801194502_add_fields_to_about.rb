class AddFieldsToAbout < ActiveRecord::Migration
  def change
    add_column :abouts, :mission, :text
    add_column :abouts, :vision, :text
    add_column :abouts, :value, :text
  end
end
