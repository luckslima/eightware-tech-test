class Users::SessionsController < Devise::SessionsController
    respond_to :json

    # skip_before_action :verify_authenticity_token, only: [:create]
    # skip_before_action :authenticate_user!, only: [:create]

    def create
      user = User.find_by(email: params[:email])
  
      if user&.valid_password?(params[:password])
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        render json: { token: token, user: user }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    private

    def set_flash_message!(*)
    end
  
    def respond_with(resource, _opts = {})
      token = request.env['warden-jwt_auth.token']
      Rails.logger.info("JWT Token: #{token}")
      Rails.logger.info("User: #{resource.inspect}")
      render json: { token: token, user: resource }, status: :ok
    end
  
    def respond_to_on_destroy
      head :no_content
    end
  
    # def current_token
    #   request.env['warden-jwt_auth.token']
    # end
  end