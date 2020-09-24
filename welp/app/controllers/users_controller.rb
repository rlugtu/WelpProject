class UsersController < ApiController
before_action :require_login, except: [:create]
    
  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by!(auth_token: request.headers[:token])
    user_reviews = Review.where(user_id: user.id)
    user_bookmarks = Bookmark.where(user_id: user.id)
    render json: { user: { username: user.username, email: user.email, name: user.name, about: user.about, state: user.state, city: user.city, zip_code: user.zip_code, birthday: user.birthday }, reviews: user_reviews, bookmarks: user_bookmarks}

  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :name, :about, :zip_code, :city, :state, :birthday)
  end
end
