Rails.application.routes.draw do

  resources :workout_plans, only: [:index, :show, :new] do
    resources :exercises, only: [:new, :create]
    resources :workouts, only: [:edit, :update]
  end

  delete '/delete_workout/:id', to: 'workouts#destroy', as: 'destroy_workout'
  delete '/delete_workout_plan/:id', to: 'workout_plans#destroy', as: 'destroy_workout_plan'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root 'workout_plans#static'
end
