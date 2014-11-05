Rails.application.routes.draw do
  resources :users
  root to: 'visitors#index'
  get '/auth/google_oauth2/callback' => 'sessions#create'
  get '/signin' => 'sessions#new', :as => :signin
  get '/signout' => 'sessions#destroy', :as => :signout
  get '/auth/failure' => 'sessions#failure'
end
