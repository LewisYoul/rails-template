Rails.application.routes.draw do
  get 'session/destroy'
  get 'map/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root to: "map#index", as: :authenticated_root, constraints: RootConstraint.new
  root to: "home#index", as: :unauthenticated_root

  resources :home, only: :index
  resources :account, only: :index
  resources :map, only: :index
  resources :oauth, only: :index
  resources :session, only: :new
  resources :activities, only: %i[index show] do
    get :refresh, on: :collection
    get :import, on: :collection
  end
  resources :plans do
    get :success, on: :collection
    get :upgrade, on: :member
  end
  resources :subscriptions, only: :update
  resources :webhooks do
    post :stripe, on: :collection
  end
end
