Rails.application.routes.draw do
  resources :requests
  resources :messages
  resources :party_members
  resources :dungeon_masters
  resources :games
  resources :characters
  resources :users
  resources :character_classes
  resources :character_races
  resources :character_mods
  resources :character_skills
  resources :character_stats

  post '/login', to: 'auth#login'
  post '/signup', to: 'users#create'
  get '/profile', to: 'users#profile'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
