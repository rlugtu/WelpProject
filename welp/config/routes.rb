Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post   "/login"       => "sessions#create"
  delete "/logout"      => "sessions#destroy"
  get "/profile"        => "users#profile"
  get "/yelp" => "yelp#fetch"
  post "/search"=> "yelp#search"
  get "/service/reviews/:id" => "reviews#show_service_reviews"
  resources :users
  resources :services 
  resources :reviews
  resources :bookmarks
end
