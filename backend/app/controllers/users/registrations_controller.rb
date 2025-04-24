class Users::RegistrationsController < Devise::RegistrationsController

    def create
      Rails.logger.info("Sign up params: #{sign_up_params.inspect}")
      user = User.new(sign_up_params)
    
      if user.save
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        render json: { token: token }, status: :created
      else
        Rails.logger.error("User creation failed: #{user.errors.full_messages}")
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name, :bio, :photo)
    end
end
