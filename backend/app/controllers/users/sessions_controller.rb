class Users::SessionsController < Devise::SessionsController
    respond_to :json
  
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