Rails.application.routes.draw do
  resources :muscle_groups
  resources :workouts
  resources :exercises
  resources :workout_plans
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  root 'static#home'
end
