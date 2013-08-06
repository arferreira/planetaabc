class CreateBanners < ActiveRecord::Migration
  def change
    create_table :banners do |t|
      t.string :name
      t.string :picture
      t.string :icon1
      t.string :icon2
      t.string :icon3

      t.timestamps
    end
  end
end
