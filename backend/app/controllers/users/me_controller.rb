class Users::MeController < ApplicationController
    before_action :authenticate_user!

    def show
        render json: { user: current_user.slice(:id, :email, :name, :photo, :bio) }, status: :ok
    end
end
