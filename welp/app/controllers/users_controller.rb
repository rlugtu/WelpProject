class UsersController < ApiController
before_action :require_login, except: [:create, :index, :destroy]
    
def index
  users = User.all
  render json: {users: users}
end
  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by!(auth_token: request.headers[:token])
    user_reviews = Review.where(user_id: user.id)
    user_bookmarks = Bookmark.where(user_id: user.id)
    render json: { user: { username: user.username, email: user.email, name: user.name, about: user.about, state: user.state, city: user.city, zip_code: user.zip_code, birthday: user.birthday, user_id: user.id }, reviews: user_reviews, bookmarks: user_bookmarks}

  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
        render json: user
    else
        render json: user.errors, status: :unprocessable_entity
    end
end

  def destroy 
    user = User.find(params[:id])
    user.destroy
    head :ok
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :name, :about, :zip_code, :city, :state, :birthday)
  end
end
