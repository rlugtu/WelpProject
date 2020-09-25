class ReviewsController < ApiController
    before_action :require_login, except: [:index, :show, :show_service_reviews, :destroy]

    def index
        reviews = Review.all
        render json: { reviews: reviews}
    end

    def show
        review = Review.find(params[:id])
        review_user = review.user
        render json: { review: review, username: review_user.username}
        # render json: { review: review, username: review_user.username}
    end

    def show_service_reviews
        review = Review.where(service_id: params[:id])
        render json: { review: review}
    end

    def create
        review = Review.new(review_params)
        review.user = current_user

        if review.save
            render json: {
                message: 'ok',
                review: review
            }
        else
            render json: {message: 'could not create review'}
        end
    end

    def update
        review = Review.find(params[:id])
        if review.update(review_params)
            render json: review
        else
            render json: review.errors, status: :unprocessable_entity
        end
    end

    def destroy 
        review = Review.find(params[:id])
        review.destroy
        head :ok
    end


    private
    def review_params
        params.require(:review).permit(:service_id, :description, :rating, :name, :yelp_id, :username)
    end

end
