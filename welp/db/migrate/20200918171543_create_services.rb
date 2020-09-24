class CreateServices < ActiveRecord::Migration[6.0]
  def change
    create_table :services do |t|
      t.string :name
      t.string :url
      t.string :yelp_id
      t.string :price
      t.string :picture
      t.string :city
      t.string :country
      t.string :state
      t.string :zip_code
      t.string :address

      t.timestamps
    end
  end
end
