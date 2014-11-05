Rails.application.routes.draw do
  get 'static_pages/new_user'

  resources :products

  get 'static_pages/about'

  get 'static_pages/help'

  get 'static_pages/user_new'

  resources :users
  root to: 'visitors#index'
  get '/auth/google_oauth2/callback' => 'sessions#create'
  get '/signin' => 'sessions#new', :as => :signin
  get '/signout' => 'sessions#destroy', :as => :signout
  get '/auth/failure' => 'sessions#failure'
  get '/about' => 'static_pages#about'
  get '/help' => 'static_pages#help'


end
