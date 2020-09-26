class ServicesController < ApiController
    before_action :require_login, except: [:index, :show, :destroy, :create]
    def index
        services = Service.all
        render json: {services: services}
    end

    def show
        service = Service.find(params[:id])
        render json: { service: service}
    end

    def create
        service = Service.new(service_params)
        if service.save
            render json: {
                message: 'ok',
                service: service,
            } 
        else
            render json: {message: 'service could not be saved'}
        end
    end

    def destroy 
        service = Service.find(params[:id])
        service.destroy
        head :ok
    end

    private 
    def service_params 
        params.require(:service).permit(:name, :url, :yelp_id, :price, :picture, :city, :country, :state, :zip_code, :address)
    end
end
