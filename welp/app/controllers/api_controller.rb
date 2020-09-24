class ApiController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods

    def require_login
      authenticate_token || render_unauthorized("Access denied")
    end
  
    def current_user
      if @current_user
        @current_user
      else
        authenticate_token
      end
    end
  
    protected
    def render_unauthorized(message)
      errors = { errors: [ detail: message] }
      render json: errors, status: :unauthorized
    end
  
    private
    def authenticate_token
      authenticate_with_http_token { | token, options | User.find_by(auth_token: token) }
    end
end
