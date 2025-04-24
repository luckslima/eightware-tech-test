class Users::MeController < ApplicationController
    before_action :authenticate_user!

    def show
        render json: {
          user: {
            id: current_user.id,
            email: current_user.email,
            name: current_user.name,
            bio: current_user.bio,
            photo_url: current_user.photo.attached? ? url_for(current_user.photo) : nil
          }
        }, status: :ok
      end
end
