Rails.application.routes.draw do

  resources :workout_plans, only: [:index, :show] do
    resources :exercises, only: [:new, :create]
    resources :workouts, only: [:edit, :update]
  end

  resources :workouts, only: [:edit, :update]

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root 'static#home'
end
