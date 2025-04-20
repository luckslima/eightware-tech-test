Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    post 'users/login', to: 'users/sessions#create'
    post 'users/signup', to: 'users/registrations#create'
  end

  namespace :users do
    get 'me', to: 'me#show'
  end
end