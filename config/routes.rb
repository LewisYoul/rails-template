Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  # Defines the root path 
  # get 'map', to: "map#index", as: :authenticated_root
  root to: "home#index", as: :unauthenticated_root

  resources :home, only: :index
end
