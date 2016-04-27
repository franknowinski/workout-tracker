Rails.application.routes.draw do
  resources :workout_plans, only: [:index, :new, :show] do
    delete '/delete_workout/:id', to: 'workouts#destroy', as: 'destroy_workout'
    resources :exercises, only: [:new, :create]
    resources :workouts, only: [:edit, :update]
  end

  get '/browse_workout_plans', to: 'browse_workout_plans#index'
  resource :browse_workout_plans, only: [:index, :show]

  delete '/delete_workout_plan/:id', to: 'workout_plans#destroy', as: 'destroy_workout_plan'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root 'static#home'
end
