require 'rails_helper'

RSpec.describe "Users::Sessions", type: :request do
  describe "POST /users/login" do
    let!(:user) { User.create!(name: 'Lucas', email: 'test@example.com', password: 'password') }

    it "logs in the user and returns JWT" do
      post '/users/login', params: {
        email: user.email,
        password: 'password'
      }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to include("token")
    end
  end
end