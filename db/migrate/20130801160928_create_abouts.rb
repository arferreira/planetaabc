class CreateAbouts < ActiveRecord::Migration
  def change
    create_table :abouts do |t|
      t.string :title
      t.string :category
      t.text :content

      t.timestamps
    end
  end
end
