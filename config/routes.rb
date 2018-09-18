Rails.application.routes.draw do
  root "pages#home"
  resources :races do
    resources :reviews
    resources :photos
    resources :questions do
      resources :answers
    end
  end
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :races, only: [ :index ]
    end
  end

  delete "answers/:id", to: "answers#destroy", as: "delete_answer"
  patch "race/:id/add_photo", to: "races#add_photo", as:"add_race_photo"
  devise_for :users,  controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
end
