require 'rails_helper'

RSpec.describe 'User Profile', type: :request do
  let!(:user) { User.create!(name:'Lucas', email: 'test@example.com', password: 'password') }

  it 'returns the user when authenticated' do
    post '/users/login', params: { email: user.email, password: 'password' }
    expect(response).to have_http_status(:ok) # Verifica se o login foi bem-sucedido

    token = JSON.parse(response.body)['token']
    expect(token).not_to be_nil

    get '/users/me', headers: { 'Authorization' => "Bearer #{token}" }

    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)['user']['email']).to eq(user.email)
  end

  it 'rejects request without token' do
    get '/users/me'
    expect(response).to have_http_status(:unauthorized)
  end
end