class AddYoutubeUrlToBanner < ActiveRecord::Migration
  def change
    add_column :banners, :youtube_url, :string
  end
end
