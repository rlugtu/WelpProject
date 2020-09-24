class CreateSavedServices < ActiveRecord::Migration[6.0]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id
      t.integer :service_id
      t.string :yelp_id
      
      t.timestamps
    end
  end
end
