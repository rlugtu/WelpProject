class AddYelpIdToReviews < ActiveRecord::Migration[6.0]
  def change
    add_column :reviews, :yelp_id, :string
  end
end
