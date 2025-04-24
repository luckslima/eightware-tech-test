require 'rails_helper'

RSpec.describe "Users::Registrations", type: :request do
  describe "POST /users/signup" do
    it "creates a new user and returns JWT" do
      post '/users/signup', params: {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
        name: 'Test User',
        bio: 'test bio.'
      }

      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)).to include("token")
      expect(JSON.parse(response.body)['user']).to include(
        'name' => 'Test User',
        'email' => 'test@example.com',
        'bio' => 'test bio.'
      )
    end
  end
end