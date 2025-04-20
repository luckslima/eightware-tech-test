class Users::MeController < ApplicationController
    before_action :authenticate_user!

    def show
        render json: { user: current_user }, status: :ok
    end
end
