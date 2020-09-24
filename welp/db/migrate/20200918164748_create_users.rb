class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username, index: true
      t.string :password_digest
      t.string :email
      t.string :name
      t.integer :zip_code
      t.string :about
      t.string :city
      t.string :state 
      t.date :birthday
      t.string :auth_token
      
      t.timestamps
    end
  end
end
