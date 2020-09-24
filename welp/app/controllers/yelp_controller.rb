require "json"
require "optparse"  
require 'rest-client'
class YelpController < ApplicationController   
  def search  
  term = Parameters[:term]  
  location = Parameters[:location] 
  response = RestClient.get("https://api.yelp.com/v3/businesses/search?term=#{term}&location=#{location}", headers={ Authorization: "Bearer #{ENV["YELP_KEY"]}"})
  # response = RestClient::Request.execute(
  #   method: "GET",
  #   url: "https://api.yelp.com/v3/businesses/search?term=#{term}&location=#{location}",  
  #   headers: { Authorization: "Bearer #{ENV["YELP_KEY"]}"}  
  #   )    
 results = JSON.parse(response)    
 render json: results  
  end

  private
  # def search_params
  #   params.require(:body).permit(:term, :location)
  # end
end