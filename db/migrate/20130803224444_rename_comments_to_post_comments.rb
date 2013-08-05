class RenameCommentsToPostComments < ActiveRecord::Migration
  def self.up
    rename_table :comments, :post_comments
  end

  def self.down
    rename_table :post_comments, :comments
  end
end
