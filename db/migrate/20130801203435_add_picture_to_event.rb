class AddPictureToEvent < ActiveRecord::Migration
  def change
    add_column :events, :picture, :string
  end
end
