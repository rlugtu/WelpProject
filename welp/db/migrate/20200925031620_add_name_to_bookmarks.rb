class AddNameToBookmarks < ActiveRecord::Migration[6.0]
  def change
    add_column :bookmarks, :name, :string
  end
end
