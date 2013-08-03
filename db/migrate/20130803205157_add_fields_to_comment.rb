class AddFieldsToComment < ActiveRecord::Migration
  def change
    add_column :comments, :email, :string
    add_column :comments, :site, :string
  end
end
