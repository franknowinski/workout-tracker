Rails.application.routes.draw do

  resources :workout_plans, only: [:index, :show, :new] do
    resources :exercises, only: [:new, :create]
    resources :workouts, only: [:edit, :update]
  end

  get '/delete_workout/:id', to: 'workouts#destroy', as: 'destroy_workout'

  resources :workouts, only: [:edit, :update]

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root 'workout_plans#show'
end
