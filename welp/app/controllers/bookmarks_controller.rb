class BookmarksController < ApiController
    before_action :require_login,  except: [:index, :show, :create, :destroy]

    def index 
        bookmarks = Bookmark.all
        render json: {bookmarks: bookmarks}
    end
   def show
    bookmark = Bookmark.find(params[:id])
    bookmark_user = bookmark.user
    render json: {bookmark: bookmark, username: bookmark_user.username}
   end 

   def create
    bookmark = Bookmark.new(bookmark_params)
    bookmark.user = current_user
        if bookmark.save
            render json: {
                message: 'ok',
                bookmark: bookmark
            }
        else render json: {message: 'Could not save service'}
        end
    end

    def destroy 
        bookmark = Bookmark.find(params[:id])
        bookmark.destroy
        head :ok
    end

    private
    def bookmark_params
        params.require(:bookmark).permit(:service_id, :user_id, :yelp_id, :name)
    end
end
